// services/user-stats.service.ts
import { prisma } from "../../lib/prisma";

const RANKS = [
  { name: "Kage", max: 1 },
  { name: "Anbu", max: 5 },
  { name: "Jonin", max: 20 },
  { name: "Chunin", max: 50 },
  { name: "Genin", max: 80 },
  { name: "Academy Student", max: 100 },
];

export class UserStatsService {
  static async getSeasonStatus(userId: string) {
    /** Active season */
    const season = await prisma.season.findFirst({
      where: { isActive: true },
    });
    if (!season) throw new Error("No active season");

    /** User season total */
    const seasonTotal = await prisma.seasonTotal.findUnique({
      where: {
        userId_seasonId: {
          userId,
          seasonId: season.id,
        },
      },
    });

    const seasonPoints = seasonTotal?.totalPoints ?? 0;

    /** All-time points */
    const allTimeAgg = await prisma.seasonTotal.aggregate({
      where: { userId },
      _sum: { totalPoints: true },
    });

    const allTimePoints = allTimeAgg._sum.totalPoints ?? 0;

    /** Leaderboard (only users with points) */
    const leaderboard = await prisma.seasonTotal.findMany({
      where: {
        seasonId: season.id,
        totalPoints: { gt: 0 },
      },
      orderBy: { totalPoints: "desc" },
      select: { userId: true, totalPoints: true },
    });

    const totalRankedUsers = leaderboard.length;
    const userIndex = leaderboard.findIndex((u) => u.userId === userId);

    const rankPosition = userIndex === -1 ? null : userIndex + 1;

    const percentile =
      userIndex === -1 ? null : ((userIndex + 1) / totalRankedUsers) * 100;

    /** Rank badge */
    let rankName = "Unranked";
    let nextRankAtPercentile: number | null = null;

    if (percentile !== null) {
      for (const rank of RANKS) {
        if (percentile <= rank.max) {
          rankName = rank.name;
          nextRankAtPercentile = rank.max;
          break;
        }
      }
    }

    /** Progress to next rank */
    let progressPercent = null;
    if (percentile !== null && nextRankAtPercentile !== null) {
      const prevMax = RANKS.find((r) => r.name === rankName)?.max ?? 100;

      progressPercent = Math.min(100, (percentile / prevMax) * 100);
    }

    /** Days remaining */
    const endsInDays = Math.max(
      0,
      Math.ceil((season.endAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    );

    return {
      season: {
        id: season.id,
        name: season.name,
        endsInDays,
      },
      points: {
        seasonPoints,
        allTimePoints,
      },
      rank: {
        name: rankName,
        position: rankPosition,
        percentile,
        progressPercent,
      },
    };
  }

  static async checkWallet(wallet: string) {
    const user = await prisma.user.findUnique({
      where: { wallet: wallet.toLowerCase() },
      select: {
        id: true,
        referredById: true,
        createdAt: true,
      },
    });

    if (!user) {
      return {
        exists: false,
      };
    }

    return {
      exists: true,
      userId: user.id,
      hasReferral: Boolean(user.referredById),
      createdAt: user.createdAt,
    };
  }
}
