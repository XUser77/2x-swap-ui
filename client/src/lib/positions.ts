import type { ClosedPosition, OpenPosition } from "@/graphql/types";
import type { SymbolKey } from "../hooks/usePrice";

export function mapOpenPosition(
  position: OpenPosition,
  priceData: { price: number }
) {
  const entryPrice = Number(position.entry_price);
  const currentPrice = priceData.price;

  const pnl = (currentPrice - entryPrice) * Number(position.asset_amount);
  const pnlPercent = ((currentPrice - entryPrice) / entryPrice) * 100;

  return {
    id: position.id,
    asset: position.asset as SymbolKey,
    size: Number(position.asset_amount),
    entryPrice,
    currentPrice,
    pnl,
    pnlPercent,
    profitShare: `${position.profit_sharing}%`,
    maturity: new Date(Number(position.maturity) * 1000).toUTCString(),
  };
}

export function mapClosedPosition(position: ClosedPosition) {
  const entryPrice = Number(position.entry_price);
  const exitPrice = Number(position.exit_price);

  const pnl = (exitPrice - entryPrice) * Number(position.asset_amount);
  const pnlPercent = ((exitPrice - entryPrice) / entryPrice) * 100;

  return {
    id: position.id,
    asset: position.asset,
    size: Number(position.asset_amount),
    entryPrice,
    exitPrice,
    pnl,
    pnlPercent,
    profitShare: position.profit_sharing,
    closedAt: new Date(Number(position.closed_at) * 1000).toUTCString(),
  };
}
