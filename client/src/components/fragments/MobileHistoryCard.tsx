export type HistoryPosition = {
  id: string;
  asset: string; // "ETH", "BTC", etc.
  size: number;
  entryPrice: number;
  exitPrice: number;
  pnl: number; // absolute PnL in USDC
  pnlPercent: number;
  profitShare: number;
  profitShareValue: number;
  isMaxLoss?: boolean;
  closedAt: string;
};

export function MobileHistoryCard({
  history: h,
}: {
  history: HistoryPosition;
}) {
  return (
    <div className="rounded-xl border p-4 bg-white shadow-sm space-y-1">
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="font-semibold">{h.asset}-USDC</span>
        <span
          className={`font-semibold ${
            h.pnl >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {h.pnl >= 0 ? "+" : "-"}${Math.abs(h.pnl).toFixed(2)} (
          {h.pnlPercent.toFixed(2)}%)
        </span>
      </div>

      <div className="mb-3 text-xs">${h.size.toFixed(2)}</div>

      {/* Details */}
      <div className="text-sm text-gray-600 space-y-1">
        <div className="flex justify-between">
          Entry <span>${h.entryPrice}</span>
        </div>

        <div className="flex justify-between">
          Exit <span>${h.exitPrice}</span>
        </div>

        {/* NEW: Profit Share */}
        <div className="flex justify-between">
          Profit Share
          <span
            className={`font-medium ${
              h.profitShareValue >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {h.pnl >= 0 ? (
              <>
                {h.profitShare}% = ${h.profitShareValue.toFixed(2)}
              </>
            ) : (
              <>
                -${Math.abs(h.profitShareValue).toFixed(2)}
                {h.isMaxLoss && " (max loss)"}
              </>
            )}
          </span>
        </div>

        {/* Closed At */}
        <div className="flex justify-between">
          Closed At <span>{h.closedAt}</span>
        </div>
      </div>
    </div>
  );
}
