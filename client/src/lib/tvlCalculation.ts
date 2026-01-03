import {
  useDailyTVL,
  useHourlyTVL,
  useMonthlyTVL,
  useYearlyTVL,
} from "@/hooks/useTVLData";
import { floorTo4H } from "./helpers";

export type Timeframe = "D" | "W" | "M" | "Y";

type TVLPoint = {
  label: string;
  value: number;
};

const formatters: Record<Timeframe, (d: Date) => string> = {
  D: (d) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  W: (d) => d.toLocaleDateString([], { weekday: "short" }),
  M: (d) => d.toLocaleDateString([], { day: "2-digit", month: "short" }),
  Y: (d) => d.toLocaleDateString([], { month: "short", year: "numeric" }),
};

export function mapApiToChart(
  items: Array<{ id: string; timestamp: string; tvl: string }>,
  tf: Timeframe
): TVLPoint[] {
  return items.map(({ id, timestamp, tvl }) =>
    tf === "D"
      ? {
          label: formatters[tf](new Date(Number(id) * 1000)),
          value: Number(tvl) / 1e6,
        }
      : {
          label: formatters[tf](new Date(Number(timestamp) * 1000)),
          value: Number(tvl) / 1e6,
        }
  );
}

export function generateTVLData(tf: Timeframe) {
  const now = Math.floor(Date.now() / 1000);
  const min24h = floorTo4H(now - 86400);

  const { data: hourlyData, loading: hourlyLoading } = useHourlyTVL(min24h);
  const { data: dailyData, loading: dailyLoading } = useDailyTVL(7);
  const { data: monthlyData, loading: monthlyLoading } = useMonthlyTVL(6);
  const { data: yearlyData, loading: yearlyLoading } = useYearlyTVL(6);

  let dailyItemReversed;
  let monthlyItemReversed;
  let yearlyItemReversed;
  if (!hourlyLoading && !dailyLoading && !monthlyLoading && !yearlyLoading) {
    dailyItemReversed = [...dailyData!.tvl_dailys.items].reverse();
    monthlyItemReversed = [...monthlyData!.tvl_monthlys.items].reverse();
    yearlyItemReversed = [...yearlyData!.tvl_yearlys.items].reverse();
  }

  let data: TVLPoint[] = [];

  switch (tf) {
    case "D":
      data = hourlyData?.tvl_hourlys.items
        ? mapApiToChart(hourlyData?.tvl_hourlys.items, "D")
        : [];
      break;
    case "W":
      data = dailyItemReversed ? mapApiToChart(dailyItemReversed, "W") : [];
      break;
    case "M":
      data = monthlyItemReversed ? mapApiToChart(monthlyItemReversed, "M") : [];
      break;
    case "Y":
      data = yearlyItemReversed ? mapApiToChart(yearlyItemReversed, "Y") : [];
      break;
  }
  return data;
}
