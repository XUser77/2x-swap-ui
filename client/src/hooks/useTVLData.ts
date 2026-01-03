import { useQuery } from "@apollo/client/react";
import {
  GET_DAILY_TVL,
  GET_HOURLY_TVL,
  GET_MONTHLY_TVL,
  GET_YEARLY_TVL,
} from "../graphql/pool";
import type {
  DailyTVL,
  HourlyTVL,
  MonthlyTVL,
  YearlyTVL,
} from "@/graphql/types";

export function useHourlyTVL(minId: number) {
  return useQuery<HourlyTVL>(GET_HOURLY_TVL, {
    variables: {
      minId,
    },
    fetchPolicy: "network-only",
  });
}
export function useDailyTVL(limit: number) {
  return useQuery<DailyTVL>(GET_DAILY_TVL, {
    variables: {
      limit,
    },
    fetchPolicy: "network-only",
  });
}
export function useMonthlyTVL(limit: number) {
  return useQuery<MonthlyTVL>(GET_MONTHLY_TVL, {
    variables: {
      limit,
    },
    fetchPolicy: "network-only",
  });
}
export function useYearlyTVL(limit: number) {
  return useQuery<YearlyTVL>(GET_YEARLY_TVL, {
    variables: {
      limit,
    },
    fetchPolicy: "network-only",
  });
}
