import type { ClosedPosition, OpenPosition } from "@/graphql/types";
import type { SymbolKey } from "../hooks/usePrice";
import { USDC_DECIMALS } from "@/constants/trade";

export function mapOpenPosition(
  position: OpenPosition,
  priceData: { price: number }
) {
  const entryPrice = Number(position.entry_price) / 100;
  const currentPrice = priceData.price;
  const size = Number(position.asset_amount) / 1_000_000;

  const pnl = (currentPrice / entryPrice) * size - size;
  const pnlPercent = ((currentPrice - entryPrice) / entryPrice) * 100;

  return {
    id: position.id,
    asset: position.asset as SymbolKey,
    size,
    entryPrice,
    currentPrice,
    pnl,
    pnlPercent,
    profitShare: `${position.profit_sharing}%`,
    maturity: new Date(Number(position.maturity) * 1000).toUTCString(),
  };
}

export function mapClosedPosition(position: ClosedPosition) {
  const size = Number(position.asset_amount) / USDC_DECIMALS;

  const entryPrice = Number(position.entry_price) / 100;
  const exitPrice = Number(position.exit_price) / 100;

  // Raw PnL (can be + / -)
  const pnl = (exitPrice / entryPrice) * size - size;
  const pnlPercent =
    entryPrice === 0 ? 0 : ((exitPrice - entryPrice) / entryPrice) * 100;

  const maxLoss = size / 2;

  let profitShareValue: number;
  let isMaxLoss = false;

  if (pnl >= 0) {
    // user gets % of profit
    profitShareValue = (pnl * position.profit_sharing) / 100;
  } else {
    // user bears 100% loss, capped
    const loss = Math.abs(pnl);

    if (loss >= maxLoss) {
      profitShareValue = -maxLoss;
      isMaxLoss = true;
    } else {
      profitShareValue = -loss;
    }
  }

  return {
    id: position.id,
    asset: position.asset,

    size,
    entryPrice,
    exitPrice,

    pnl,
    pnlPercent,

    profitShare: position.profit_sharing,
    profitShareValue,
    isMaxLoss,

    closedAt: new Date(Number(position.closed_at) * 1000).toUTCString(),
  };
}
