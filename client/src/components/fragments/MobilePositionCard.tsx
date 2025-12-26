export function MobilePositionCard({
  position: p,
  onClose,
  isPending,
}: {
  position: any;
  isPending: boolean;
  onClose: (id: bigint, asset: any) => void;
}) {
  return (
    <div className="rounded-xl border p-4 bg-white shadow-sm space-y-1">
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="font-semibold">{p.asset}-USDC</span>
        <span
          className={`font-semibold ${
            p.pnl >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {p.pnl >= 0 ? "+" : "-"}${Math.abs(p.pnl).toFixed(2)} (
          {p.pnlPercent.toFixed(2)}%)
        </span>
      </div>
      <div className="mb-3 text-xs">${p.size.toFixed(2)}</div>

      {/* Details */}
      <div className="text-sm text-gray-600 space-y-1 mb-2">
        <div className="flex justify-between">
          Entry <span>${p.entryPrice}</span>
        </div>
        <div className="flex justify-between">
          Current <span>${p.currentPrice}</span>
        </div>
        <div className="flex justify-between">
          Maturity{" "}
          <span>
            {new Date(p.maturity).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Action */}
      <button
        disabled={isPending}
        onClick={() => onClose(BigInt(p.id), p.asset)}
        className="w-full py-3 rounded-lg bg-blue-900 text-white font-semibold disabled:opacity-50"
      >
        Close position
      </button>
    </div>
  );
}
