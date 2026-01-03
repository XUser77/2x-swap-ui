import type { ClosedPositionAPY } from "@/graphql/types";

const ONE_YEAR_SECONDS = 365n * 24n * 60n * 60n;

export function parseUnits(value: number, decimals: number): bigint {
  return BigInt(Math.floor(value * 10 ** decimals));
}

export function formatUSDCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export function calculatePoolApy(params: {
  positions: ClosedPositionAPY[];
  windowStart: number; // unix seconds
  windowEnd?: number; // defaults to now
}): number {
  const {
    positions,
    windowStart,
    windowEnd = Math.floor(Date.now() / 1000),
  } = params;

  let totalProfit = 0n; // USDC (6 decimals)
  let totalCapitalTime = 0n; // USDC * seconds

  const windowStartBig = BigInt(windowStart);
  const windowEndBig = BigInt(windowEnd);

  for (const p of positions) {
    const assetAmount = BigInt(p.asset_amount);
    const closeAssetAmount = BigInt(p.close_asset_amount);
    const openedAt = BigInt(p.opened_at);
    const closedAt = BigInt(p.closed_at);

    // Ignore malformed data
    if (closedAt <= openedAt) continue;

    // Skip if outside window
    if (closedAt <= windowStartBig || openedAt >= windowEndBig) {
      continue;
    }

    // Pool principal = half of total position size
    const poolPrincipal = assetAmount / 2n;

    // Effective time range inside window
    const effectiveOpen = openedAt > windowStartBig ? openedAt : windowStartBig;
    const effectiveClose = closedAt < windowEndBig ? closedAt : windowEndBig;
    const duration = effectiveClose - effectiveOpen;

    if (duration <= 0n) continue;

    // Profit calculation
    const profit = closeAssetAmount - assetAmount;

    // Pool only earns on profitable trades
    const poolBonus =
      profit > 0n ? (profit * BigInt(p.profit_sharing)) / 100n : 0n;

    totalProfit += poolBonus;
    totalCapitalTime += poolPrincipal * duration;
  }

  // Safety: no deployed capital
  if (totalCapitalTime === 0n) {
    return 0;
  }

  // Annualize
  const apy = Number((totalProfit * ONE_YEAR_SECONDS) / totalCapitalTime);

  // Convert from USDC units to %
  return apy;
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
