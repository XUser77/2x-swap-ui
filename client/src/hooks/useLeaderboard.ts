import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export type LeaderboardRow = {
  rank: number;
  wallet: string;
  league: string;
  seasonPoints: number;
  totalPoints: number;
};

type LeaderboardResponse = {
  page: number;
  limit: number;
  totalRankedUsers: number;
  totalPages: number;
  data: LeaderboardRow[];
};

export function useLeaderboard(page: number, limit: number) {
  return useQuery({
    queryKey: ["leaderboard", page, limit],
    queryFn: async () => {
      const { data } = await api.get<LeaderboardResponse>("/api/leaderboard", {
        params: { page, limit },
      });
      return data;
    },
  });
}
