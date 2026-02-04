import type { ClosedPositionAPY } from "@/graphql/types";

export function parseUnits(value: number, decimals: number): bigint {
  return BigInt(Math.floor(value * 10 ** decimals));
}

export function formatUSDCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

const ONE_YEAR_SECONDS = 365n * 24n * 60n * 60n;

export function calculatePoolApy(params: {
  positions: ClosedPositionAPY[];
  windowStart: number; // unix seconds
  windowEnd?: number; // defaults to now
  totalDebt: bigint; // deployed capital
  tvl: bigint; // total pool capital (idle + deployed)
}): number {
  const {
    positions,
    windowStart,
    windowEnd = Math.floor(Date.now() / 1000),
    totalDebt,
    tvl,
  } = params;

  let totalProfit = 0n; // USDC (6 decimals)
  let totalCapitalTime = 0n; // deployed USDC * seconds

  const windowStartBig = BigInt(windowStart);
  const windowEndBig = BigInt(windowEnd);

  for (const p of positions) {
    const assetAmount = BigInt(p.asset_amount);
    const closeAssetAmount = BigInt(p.close_asset_amount);
    const openedAt = BigInt(p.opened_at);
    const closedAt = BigInt(p.closed_at);

    if (closedAt <= openedAt) continue;
    if (closedAt <= windowStartBig || openedAt >= windowEndBig) continue;

    const poolPrincipal = assetAmount / 2n;

    const effectiveOpen = openedAt > windowStartBig ? openedAt : windowStartBig;
    const effectiveClose = closedAt < windowEndBig ? closedAt : windowEndBig;
    const duration = effectiveClose - effectiveOpen;

    if (duration <= 0n) continue;

    const profit = closeAssetAmount - assetAmount;

    const poolBonus =
      profit > 0n ? (profit * BigInt(p.profit_sharing)) / 100n : 0n;

    totalProfit += poolBonus;
    totalCapitalTime += poolPrincipal * duration;
  }

  // No deployed capital → no yield
  if (totalCapitalTime === 0n || totalDebt === 0n || tvl === 0n) {
    return 0;
  }

  // Strategy APY (on used capital only)
  const strategyApy = (totalProfit * ONE_YEAR_SECONDS) / totalCapitalTime;

  // Utilization = used / total
  // scaled to 1e18 precision to avoid truncation
  const utilization = (totalDebt * 1_000_000_000_000_000_000n) / tvl;

  // LP APY = Strategy APY × Utilization
  const lpApyScaled = (strategyApy * utilization) / 1_000_000_000_000_000_000n;

  return Number(lpApyScaled);
}

export function floorTo4H(timestamp: number) {
  const ONE_DAY = 86400;
  const FOUR_H = 14400;

  // start of UTC day
  const dayStart = timestamp - (timestamp % ONE_DAY);

  // number of 4-h intervals since midnight
  const sinceDayStart = timestamp - dayStart;
  const bucketIndex = sinceDayStart / FOUR_H;

  return dayStart + bucketIndex * FOUR_H;
}
