import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

/* ------------------ Types ------------------ */

export type ReferralStats = {
  referredParticipants: number;
  referralPointsSeason: number;
  referralPointsAllTime: number;
  activeReferralsLast30Days: number;
};

export type ReferralCode = {
  referralCode: string;
  referralUrl: string;
};

export type ReferralActivity = {
  wallet: string;
  dateJoined: string;
  activityType: "Trading" | "Liquidity" | "Mixed" | "None";
  totalVolume: number;
  pointsAttributed: number;
};

/* ------------------ Queries ------------------ */

export function useReferralStats() {
  return useQuery({
    queryKey: ["referral-stats"],
    queryFn: async () => {
      const { data } = await api.get<ReferralStats>("/api/referral/stats");
      return data;
    },
  });
}

export function useReferralCode() {
  return useQuery({
    queryKey: ["referral-code"],
    queryFn: async () => {
      const { data } = await api.get<ReferralCode>("/api/referral/code");
      return data;
    },
  });
}

export function useReferralActivity() {
  return useQuery({
    queryKey: ["referral-activity"],
    queryFn: async () => {
      const { data } = await api.get<ReferralActivity[]>(
        "/api/referral/activity"
      );
      return data;
    },
  });
}
