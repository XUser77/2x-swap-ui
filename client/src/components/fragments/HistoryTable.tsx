"use client";

import { useEffect, useMemo, useState } from "react";
import { useHistoryPosition } from "@/hooks/useHistoryPosition";
import { mapClosedPosition } from "@/lib/positions";
import type { ClosedPosition } from "@/graphql/types";
import { usePositionsSyncStore } from "@/stores/usePositionSyncStore";
import { MobileHistoryCard } from "./MobileHistoryCard";

type Props = {
  owner: `0x${string}`;
  limit?: number;
};

function HistoryTable({ owner, limit = 10 }: Props) {
  const [page, setPage] = useState(0);

  const version = usePositionsSyncStore((s) => s.version);
  const { data, loading, error, refetch } = useHistoryPosition(
    owner,
    page,
    limit
  );

  const totalCount = data?.positions.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / limit);

  const canPrev = page > 0;
  const canNext = page + 1 < totalPages;

  const history = useMemo(() => {
    if (!data) return [];
    return data.positions.items.map((position: ClosedPosition) =>
      mapClosedPosition(position)
    );
  }, [data]);

  useEffect(() => {
    refetch();
  }, [version, refetch]);

  // Auto-fix: if user is on an empty page (edge case)
  useEffect(() => {
    if (!loading && page > 0 && history.length === 0) {
      setPage((p) => p - 1);
    }
  }, [history, loading, page]);

  if (loading) {
    return <div className="flex justify-center w-full">Loading history…</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center w-full">Failed to load history</div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="flex justify-center w-full">No History Available</div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop table */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b border-gray-200">
              <tr>
                <th className="text-left py-2">Asset</th>
                <th className="text-left">Size (USDC)</th>
                <th className="text-left">Entry Price</th>
                <th className="text-left">Exit Price</th>
                <th className="text-left">P&amp;L</th>
                <th className="text-left">Profit Share</th>
                <th className="text-left">Closed At</th>
              </tr>
            </thead>

            <tbody>
              {history.map((h) => (
                <tr
                  key={h.id}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <td className="py-3 font-medium">{h.asset}-USDC</td>
                  <td>${h.size.toFixed(2)}</td>
                  <td>${h.entryPrice}</td>
                  <td>${h.exitPrice}</td>
                  <td
                    className={`font-medium ${
                      h.pnl >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {h.pnl >= 0 ? "+" : "-"}${Math.abs(h.pnl).toFixed(2)} (
                    {h.pnlPercent.toFixed(2)}%)
                  </td>
                  <td
                    className={`font-medium ${
                      h.profitShareValue >= 0
                        ? "text-green-500"
                        : "text-red-500"
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
                  </td>
                  <td className="opacity-50">{h.closedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {history.map((h) => (
          <MobileHistoryCard key={h.id} history={h} />
        ))}
      </div>

      {/* Desktop pagination (unchanged) */}
      <div className="flex items-center justify-between">
        <button
          disabled={!canPrev}
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          className="px-3 py-1 rounded-md border disabled:opacity-50 bg-blue-900 text-white"
        >
          Previous
        </button>

        <span className="font-semibold text-blue-900">
          Page {page + 1} of {totalPages}
        </span>

        <button
          disabled={!canNext}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 rounded-md border disabled:opacity-50 bg-blue-900 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default HistoryTable;
