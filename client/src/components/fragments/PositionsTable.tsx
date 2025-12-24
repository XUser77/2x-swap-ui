"use client";

import { useEffect, useMemo, useState } from "react";
import { useActivePosition } from "@/hooks/useActivePosition";
import { mapOpenPosition } from "@/lib/positions";
import { usePositionPrice } from "@/hooks/usePositionPrice";
import { useClosePosition } from "@/hooks/useClosePosition";
import toast from "react-hot-toast";
import { usePublicClient } from "wagmi";

type Props = {
  owner: string;
  limit?: number;
};

function PositionsTable({ owner, limit = 10 }: Props) {
  const [page, setPage] = useState(0);

  // custom hook
  const { data, loading, error } = useActivePosition(owner, page, limit);
  const { closePosition, isPending } = useClosePosition();
  const publicClient = usePublicClient();
  const { prices } = usePositionPrice();

  const totalCount = data?.positions.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / limit);

  const canPrev = page > 0;
  const canNext = page + 1 < totalPages;

  const positions = useMemo(() => {
    if (!data) return [];
    return data.positions.items.map((position) =>
      mapOpenPosition(position, prices[position.asset] ?? { price: 0 })
    );
  }, [data, prices]);

  // Auto-fix: if current page becomes empty (e.g. after closing last position)
  useEffect(() => {
    if (!loading && page > 0 && positions.length === 0) {
      setPage((p) => p - 1);
    }
  }, [positions, loading, page]);

  const handleClosePosition = async (id: bigint) => {
    try {
      toast.loading("Closing position...", { id: "close" });

      const hash = await closePosition(id);
      await publicClient?.waitForTransactionReceipt({ hash });

      toast.success("Position closed successfully!", { id: "close" });
    } catch (err: any) {
      toast.error(err?.shortMessage || err?.message || "Transaction failed");
    }
  };

  if (loading) {
    return <div className="flex justify-center w-full">Loading positions…</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center w-full">Failed to load positions</div>
    );
  }

  if (positions.length === 0) {
    return (
      <div className="flex justify-center w-full">No Positions Available</div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="text-left py-2 pl-2">Asset</th>
              <th className="text-left">Size (USDC)</th>
              <th className="text-left">Entry price</th>
              <th className="text-left">Current price</th>
              <th className="text-left">P&amp;L</th>
              <th className="text-left">Profit Share</th>
              <th className="text-left">Maturity</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {positions.map((p) => (
              <tr key={p.id} className="border-b last:border-b-0">
                <td className="py-3 pl-2 font-medium">{p.asset}-USDC</td>
                <td>${p.size.toLocaleString()}</td>
                <td>${p.entryPrice.toLocaleString()}</td>
                <td>${p.currentPrice.toLocaleString()}</td>
                <td className="text-green-500 font-medium">
                  +${p.pnl.toFixed(2)} ({p.pnlPercent.toFixed(2)}%)
                </td>
                <td>{p.profitShare}</td>
                <td>{p.maturity}</td>
                <td className="text-center">
                  <button
                    disabled={isPending}
                    onClick={() => handleClosePosition(BigInt(p.id))}
                    className="px-3 py-1 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                  >
                    Close
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <button
          disabled={!canPrev}
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-500">
          Page {page + 1} of {totalPages}
        </span>

        <button
          disabled={!canNext}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PositionsTable;
