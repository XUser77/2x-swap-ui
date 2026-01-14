// services/liquidity.service.ts
import { prisma } from "../../lib/prisma";
import Decimal from "decimal.js";
import { startOfDay, endOfDay } from "date-fns";
import { DAY_QUERY, fetchFromPonder } from "../../lib/ponderGraphQl";

const LP_SOFTCAP_DAY = 5000;
const LP_SOFTCAP_RATE = 0.25;
const REF_RATE = 0.25;

function applySoftCap(score: number) {
  if (score <= LP_SOFTCAP_DAY) return score;
  return LP_SOFTCAP_DAY + (score - LP_SOFTCAP_DAY) * LP_SOFTCAP_RATE;
}

export class LiquidityService {
  static async runDailySnapshot(date: Date) {
    const season = await prisma.season.findFirst({
      where: { isActive: true },
    });
    if (!season) throw new Error("No active season");

    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);

    const LP_MIN =
      season.name === "Alpha" ? 200 : season.name === "Beta" ? 500 : 1000;

    // 1. Fetch avgDailyBalance per user from Ponder DB

    const data = await fetchFromPonder<{
      lpBalanceCheckpoints: {
        user: string;
        assets: string;
        timestamp: string;
      }[];
    }>(DAY_QUERY, {
      start: Math.floor(dayStart.getTime() / 1000),
      end: Math.floor(dayEnd.getTime() / 1000),
    });

    const perUser = new Map<
      string,
      { sum: number; count: number; endBalance: number }
    >();

    for (const row of data.lpBalanceCheckpoints) {
      const assets = Number(row.assets);

      if (!perUser.has(row.user)) {
        perUser.set(row.user, {
          sum: 0,
          count: 0,
          endBalance: assets,
        });
      }

      const acc = perUser.get(row.user)!;
      acc.sum += assets;
      acc.count += 1;
      acc.endBalance = assets; // last row wins (ordered by timestamp)
    }

    const balances = Array.from(perUser.entries()).map(([userId, v]) => ({
      userId,
      avgBalance: v.sum / v.count,
      endBalance: v.endBalance,
    }));

    for (const row of balances) {
      const avgDailyBalance = Number(row.avgBalance);
      const endBalance = Number(row.endBalance);

      if (avgDailyBalance < LP_MIN) {
        await this.resetStreak(row.userId);
        continue;
      }

      // 2. Loyalty streak
      const lpState = await prisma.userLPState.upsert({
        where: { userId: row.userId },
        update: {
          lastBalance: new Decimal(endBalance),
          lastUpdated: dayEnd,
          currentStreak: { increment: 1 },
        },
        create: {
          userId: row.userId,
          pool: "X2POOL",
          lastBalance: new Decimal(endBalance),
          lastUpdated: dayEnd,
          currentStreak: 1,
        },
      });

      let loyaltyMultiplier = 1.0;
      if (lpState.currentStreak >= 30) loyaltyMultiplier = 2.0;
      else if (lpState.currentStreak >= 7) loyaltyMultiplier = 1.5;

      // 3. Score
      const baseScore = avgDailyBalance / 1000;
      const rawScore = baseScore * loyaltyMultiplier;
      const finalScore = applySoftCap(rawScore);

      // 4. Persist snapshot
      await prisma.liquiditySnapshot.create({
        data: {
          userId: row.userId,
          seasonId: season.id,
          avgDailyBalance: new Decimal(avgDailyBalance),
          loyaltyMultiplier,
          baseScore,
          finalScore,
          snapshotDate: dayStart,
        },
      });

      // 5. Update SeasonTotal (with multiplier)
      const seasonPoints = finalScore * season.multiplier;

      const seasonTotal = await prisma.seasonTotal.upsert({
        where: {
          userId_seasonId: {
            userId: row.userId,
            seasonId: season.id,
          },
        },
        update: {
          lpActivityPoints: { increment: seasonPoints },
          totalPoints: { increment: seasonPoints },
        },
        create: {
          userId: row.userId,
          seasonId: season.id,
          lpActivityPoints: seasonPoints,
          totalPoints: seasonPoints,
        },
      });

      // 6. Referral points
      await this.applyReferral(row.userId, season, seasonTotal);
    }

    return { processed: balances.length };
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
    seasonTotal: any
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

    const inviteeActivity =
      seasonTotal.traderActivityPoints + seasonTotal.lpActivityPoints;
    const referrerActivity =
      (referrerTotal?.traderActivityPoints ?? 0) +
      (referrerTotal?.lpActivityPoints ?? 0);

    if (inviteeActivity < 200 || referrerActivity < 200) return;

    const rawReferral = inviteeActivity * REF_RATE;
    const referralCap = referrerActivity * 2;
    const referralPoints = Math.min(rawReferral, referralCap);

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
        referralPoints: { increment: referralPoints },
        totalPoints: { increment: referralPoints },
      },
    });
  }
}
