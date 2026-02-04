// services/liquidity.service.ts
import { prisma } from "../lib/prisma.js";
import Decimal from "decimal.js";
import { DAY_QUERY, fetchFromPonder } from "../lib/ponderGraphQl.js";
import { whitelistedReferrer } from "../utils/whitelistedReferrer.js";
import { getUTCDayBounds } from "../utils/day.js";

const LP_SOFTCAP_DAY = 5000;
const LP_SOFTCAP_RATE = 0.25;
const REF_RATE = 0.25;

function applySoftCap(score: number) {
  if (score <= LP_SOFTCAP_DAY) return score;
  return LP_SOFTCAP_DAY + (score - LP_SOFTCAP_DAY) * LP_SOFTCAP_RATE;
}

export class LiquidityService {
  static async runDailySnapshot(date: Date) {
    console.log("RUN DAILY SNAPSHOT");
    const USDC_DECIMALS = 6;
    const USDC_SCALE = new Decimal(10).pow(USDC_DECIMALS);

    const season = await prisma.season.findFirst({
      where: { isActive: true },
    });
    if (!season) throw new Error("No active season");

    const { start: dayStart, end: dayEnd } = getUTCDayBounds(date);

    const LP_MIN =
      season.name === "Alpha" ? 200 : season.name === "Beta" ? 500 : 1000;

    /** ---------------- 1. Fetch checkpoints ---------------- */
    const data = await fetchFromPonder<{
      lpBalanceCheckpoints: {
        items: {
          user: string;
          assets: string;
          timestamp: string;
        }[];
      };
    }>(DAY_QUERY, {
      start: Math.floor(dayStart.getTime() / 1000),
      end: Math.floor(dayEnd.getTime() / 1000),
    });
    console.log("DAY START:", dayStart.getTime() / 1000);
    console.log("DAY END:", dayEnd.getTime() / 1000);

    /** ---------------- 2. Aggregate per wallet ---------------- */
    const perWallet = new Map<
      string,
      { sum: number; count: number; endBalance: number }
    >();

    console.log("DATA FETCH FROM PONDER:", data.lpBalanceCheckpoints.items);

    for (const row of data.lpBalanceCheckpoints.items) {
      const balance = new Decimal(row.assets).div(USDC_SCALE).toNumber();
      const wallet = row.user.toLowerCase();

      if (!perWallet.has(wallet)) {
        perWallet.set(wallet, { sum: 0, count: 0, endBalance: balance });
      }

      const acc = perWallet.get(wallet)!;
      acc.sum += balance;
      acc.count += 1;
      acc.endBalance = balance;
    }

    /** ---------------- 3. Load ALL LP users (carry forward holders) ---------------- */
    const previousLPStates = await prisma.userLPState.findMany();

    const allWallets = new Set<string>([
      ...Array.from(perWallet.keys()),
      ...previousLPStates.map((s) => s.userId), // temporarily userId, mapped below
    ]);

    /** ---------------- 4. Resolve wallets → userIds ---------------- */
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { wallet: { in: Array.from(allWallets) } },
          { id: { in: previousLPStates.map((s) => s.userId) } },
        ],
      },
    });

    console.log("MERGED USER:", users);

    /** ---------------- 5. Process each LP user ---------------- */
    for (const user of users) {
      console.log("USER PROCESSED:", user);

      const wallet = user.wallet.toLowerCase();
      const checkpoint = perWallet.get(wallet);
      const prevState = previousLPStates.find((s) => s.userId === user.id);

      let avgDailyBalance = 0;
      let endBalance = prevState ? prevState.lastBalance.toNumber() : 0;

      if (checkpoint) {
        avgDailyBalance = checkpoint.sum / checkpoint.count;
        endBalance = checkpoint.endBalance;
      } else if (prevState) {
        if (prevState.lastBalance.eq(0)) {
          await this.resetStreak(user.id);
          continue;
        }
        avgDailyBalance = prevState.lastBalance.toNumber();
      } else {
        continue; // no LP ever
      }

      if (avgDailyBalance < LP_MIN) {
        await this.resetStreak(user.id);
        continue;
      }

      /** ---------------- 6. Loyalty streak ---------------- */
      const lpState = await prisma.userLPState.upsert({
        where: { userId: user.id },
        update: {
          lastBalance: new Decimal(endBalance),
          lastUpdated: dayEnd,
          currentStreak: { increment: 1 },
        },
        create: {
          userId: user.id,
          pool: "X2POOL",
          lastBalance: new Decimal(endBalance),
          lastUpdated: dayEnd,
          currentStreak: 1,
        },
      });

      let loyaltyMultiplier = 1.0;
      if (lpState.currentStreak >= 30) loyaltyMultiplier = 2.0;
      else if (lpState.currentStreak >= 7) loyaltyMultiplier = 1.5;

      /** ---------------- 7. Score ---------------- */
      const baseScore = avgDailyBalance / 1000;
      const rawScore = baseScore * loyaltyMultiplier;
      const finalScore = applySoftCap(rawScore);
      console.log("FINAL SCORE:", finalScore);

      /** ---------------- 8. Persist snapshot ---------------- */
      await prisma.liquiditySnapshot.upsert({
        where: {
          userId_snapshotDate: {
            userId: user.id,
            snapshotDate: dayStart,
          },
        },
        update: {
          avgDailyBalance: new Decimal(avgDailyBalance),
          loyaltyMultiplier,
          baseScore,
          finalScore,
        },
        create: {
          userId: user.id,
          seasonId: season.id,
          avgDailyBalance: new Decimal(avgDailyBalance),
          loyaltyMultiplier,
          baseScore,
          finalScore,
          snapshotDate: dayStart,
        },
      });

      /** ---------------- 9. Update SeasonTotal ---------------- */
      const seasonPoints = finalScore * season.multiplier;
      console.log("SEASON POINTS:", seasonPoints);

      const seasonTotal = await prisma.seasonTotal.upsert({
        where: {
          userId_seasonId: {
            userId: user.id,
            seasonId: season.id,
          },
        },
        update: {
          lpActivityPoints: { increment: seasonPoints },
          totalPoints: { increment: seasonPoints },
        },
        create: {
          userId: user.id,
          seasonId: season.id,
          lpActivityPoints: seasonPoints,
          totalPoints: seasonPoints,
        },
      });

      /** ---------------- 10. Referral ---------------- */
      await this.applyReferral(user.id, season, seasonTotal);
    }

    return { processed: users.length };
  }

  private static async resetStreak(userId: string) {
    await prisma.userLPState.updateMany({
      where: { userId },
      data: { currentStreak: 0 },
    });
  }

  private static async applyReferral(
    userId: string,
    season: any,
    seasonTotal: any,
  ) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { referredBy: true },
    });

    if (!user?.referredById) return;

    const referrerTotal = await prisma.seasonTotal.findUnique({
      where: {
        userId_seasonId: {
          userId: user.referredById,
          seasonId: season.id,
        },
      },
    });

    const existing = await prisma.referralEarning.findUnique({
      where: {
        referrerId_inviteeId_seasonId: {
          referrerId: user.referredById,
          inviteeId: userId,
          seasonId: season.id,
        },
      },
    });

    const inviteeActivity =
      seasonTotal.traderActivityPoints + seasonTotal.lpActivityPoints;

    const referrerActivity =
      (referrerTotal?.traderActivityPoints ?? 0) +
      (referrerTotal?.lpActivityPoints ?? 0);

    const referrer = await prisma.user.findUnique({
      where: { id: user.referredById },
    });
    if (!referrer) throw new Error("User not found");

    const isWhitelisted = whitelistedReferrer
      .map((w) => w.toLowerCase())
      .includes(referrer.wallet.toLowerCase());

    if (inviteeActivity < 200) return;
    if (!isWhitelisted && referrerActivity < 200) return;

    const rawReferral = inviteeActivity * REF_RATE;
    const referralCap = referrerActivity * 10;
    const referralPoints = Math.min(rawReferral, referralCap);

    const previousPoints = existing?.referralPoints ?? 0;
    const delta = referralPoints - previousPoints;

    if (delta <= 0) return; // nothing new earned

    await prisma.referralEarning.upsert({
      where: {
        referrerId_inviteeId_seasonId: {
          referrerId: user.referredById,
          inviteeId: userId,
          seasonId: season.id,
        },
      },
      update: {
        referralPoints,
        inviteeActivityPoints: inviteeActivity,
        capped: rawReferral > referralCap,
      },
      create: {
        referrerId: user.referredById,
        inviteeId: userId,
        seasonId: season.id,
        referralPoints,
        inviteeActivityPoints: inviteeActivity,
        capped: rawReferral > referralCap,
      },
    });

    await prisma.seasonTotal.update({
      where: {
        userId_seasonId: {
          userId: user.referredById,
          seasonId: season.id,
        },
      },
      data: {
        referralPoints: { increment: delta },
        totalPoints: { increment: delta },
      },
    });
  }
}
