import { randomBytes } from "crypto";
import { prisma } from "../../lib/prisma";

type AttachReferralInput = {
  wallet: string;
  referralCode?: string;
};

export class ReferralService {
  /* ============================
     REFERRAL LOCKING 
     ============================ */

  static async attachReferral({ wallet, referralCode }: AttachReferralInput) {
    const user = await prisma.user.upsert({
      where: { wallet },
      update: {},
      create: {
        wallet,
        referralCode: this.generateReferralCode(),
      },
    });

    if (user.referredById) {
      return {
        userId: user.id,
        referredById: user.referredById,
        message: "Referral already locked",
      };
    }

    if (!referralCode) {
      return {
        userId: user.id,
        referredById: null,
        message: "No referral code used",
      };
    }

    const referrer = await prisma.user.findUnique({
      where: { referralCode },
    });

    if (!referrer) throw new Error("Invalid referral code");
    if (referrer.id === user.id) throw new Error("Cannot refer yourself");

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { referredById: referrer.id },
    });

    return {
      userId: updatedUser.id,
      referredById: referrer.id,
      referrerWallet: referrer.wallet,
      message: "Referral locked successfully",
    };
  }

  /* ============================
     REFERRAL STATS
     ============================ */

  static async getReferralStats(userId: string) {
    const activeSeason = await prisma.season.findFirst({
      where: { isActive: true },
    });

    if (!activeSeason) throw new Error("No active season");

    const [referredParticipants, seasonPoints, allTimePoints] =
      await Promise.all([
        prisma.user.count({
          where: { referredById: userId },
        }),

        prisma.referralEarning.aggregate({
          where: {
            referrerId: userId,
            seasonId: activeSeason.id,
          },
          _sum: { referralPoints: true },
        }),

        prisma.referralEarning.aggregate({
          where: { referrerId: userId },
          _sum: { referralPoints: true },
        }),
      ]);

    // Active referrals (last 30 days)
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const activeInvitees = await prisma.user.findMany({
      where: { referredById: userId },
      select: {
        id: true,
        trades: {
          where: { createdAt: { gte: since } },
          select: { id: true },
        },
        liquiditySnapshots: {
          where: { snapshotDate: { gte: since } },
          select: { id: true },
        },
      },
    });

    const activeCount = activeInvitees.filter(
      (u) => u.trades.length > 0 || u.liquiditySnapshots.length > 0
    ).length;

    return {
      referredParticipants,
      referralPointsSeason: seasonPoints._sum.referralPoints ?? 0,
      referralPointsAllTime: allTimePoints._sum.referralPoints ?? 0,
      activeReferralsLast30Days: activeCount,
    };
  }

  /* ============================
     REFERRAL CODE
     ============================ */

  static async getReferralCode(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { referralCode: true },
    });

    if (!user) throw new Error("User not found");

    return {
      referralCode: user.referralCode,
      referralUrl: `https://2xswap.io/ref/${user.referralCode}`,
    };
  }

  /* ============================
     REFERRAL ACTIVITY TABLE
     ============================ */

  static async getReferralActivity(userId: string) {
    const activeSeason = await prisma.season.findFirst({
      where: { isActive: true },
    });

    if (!activeSeason) throw new Error("No active season");

    const invitees = await prisma.user.findMany({
      where: { referredById: userId },
      include: {
        trades: {
          where: { seasonId: activeSeason.id },
        },
        liquiditySnapshots: {
          where: { seasonId: activeSeason.id },
        },
        referralEarnings: {
          where: {
            seasonId: activeSeason.id,
            referrerId: userId,
          },
        },
      },
    });

    return invitees.map((invitee) => {
      const tradeVolume = invitee.trades.reduce(
        (sum, t) => sum + Number(t.volume),
        0
      );

      const lpVolume = invitee.liquiditySnapshots.reduce(
        (sum, l) => sum + Number(l.avgDailyBalance),
        0
      );

      let activityType: "Trading" | "Liquidity" | "Mixed" | "None" = "None";

      if (tradeVolume > 0 && lpVolume > 0) activityType = "Mixed";
      else if (tradeVolume > 0) activityType = "Trading";
      else if (lpVolume > 0) activityType = "Liquidity";

      const pointsAttributed = invitee.referralEarnings[0]?.referralPoints ?? 0;

      return {
        wallet: invitee.wallet,
        dateJoined: invitee.createdAt,
        activityType,
        totalVolume: activityType === "Trading" ? tradeVolume : lpVolume,
        pointsAttributed,
      };
    });
  }

  /* ============================
     UTIL
     ============================ */

  private static generateReferralCode(): string {
    return randomBytes(4).toString("hex").toUpperCase();
  }
}
