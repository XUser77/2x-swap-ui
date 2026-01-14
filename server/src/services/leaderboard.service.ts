import { prisma } from "../../lib/prisma";
import { getLeagueFromPercentile } from "../utils/league";

type GetLeaderboardInput = {
  page: number;
  limit: number;
};

export class LeaderboardService {
  static async getLeaderboard({ page, limit }: GetLeaderboardInput) {
    const activeSeason = await prisma.season.findFirst({
      where: { isActive: true },
    });

    if (!activeSeason) throw new Error("No active season");

    const skip = (page - 1) * limit;

    /**
     * 1️⃣ Compute ALL-TIME points per user
     * Only users with points > 0 are ranked
     */
    const rankedUsers = await prisma.seasonTotal.groupBy({
      by: ["userId"],
      _sum: {
        totalPoints: true,
      },
      having: {
        totalPoints: {
          _sum: {
            gt: 0,
          },
        },
      },
      orderBy: {
        _sum: {
          totalPoints: "desc",
        },
      },
      skip,
      take: limit,
    });

    /**
     * Total ranked users (for percentile math)
     */
    const totalRankedUsers = await prisma.seasonTotal.groupBy({
      by: ["userId"],
      having: {
        totalPoints: {
          _sum: {
            gt: 0,
          },
        },
      },
    });

    const totalUsers = totalRankedUsers.length;

    /**
     * Load wallets + season points for current season
     */
    const userIds = rankedUsers.map((r) => r.userId);

    const [users, seasonTotals] = await Promise.all([
      prisma.user.findMany({
        where: { id: { in: userIds } },
        select: { id: true, wallet: true },
      }),

      prisma.seasonTotal.findMany({
        where: {
          userId: { in: userIds },
          seasonId: activeSeason.id,
        },
      }),
    ]);

    const userMap = new Map(users.map((u) => [u.id, u]));
    const seasonMap = new Map(
      seasonTotals.map((s) => [s.userId, s.totalPoints])
    );

    /**
     * Build leaderboard rows
     */
    const data = rankedUsers.map((row, index) => {
      const globalRank = skip + index + 1;
      const percentile = globalRank / totalUsers;

      return {
        rank: globalRank,
        wallet: userMap.get(row.userId)?.wallet ?? "Unknown",
        league: getLeagueFromPercentile(percentile),
        seasonPoints: seasonMap.get(row.userId) ?? 0,
        totalPoints: row._sum.totalPoints ?? 0,
      };
    });

    return {
      page,
      limit,
      totalRankedUsers: totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      data,
    };
  }
}
