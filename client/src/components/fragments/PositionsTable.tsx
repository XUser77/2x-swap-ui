"use client";

import { useEffect, useMemo, useState } from "react";
import { useActivePosition } from "@/hooks/useActivePosition";
import { mapOpenPosition } from "@/lib/positions";
import { usePositionPrice } from "@/hooks/usePositionPrice";
import { useClosePosition } from "@/hooks/useClosePosition";
import toast from "react-hot-toast";
import { usePublicClient } from "wagmi";
import { usePositionsSyncStore } from "@/stores/usePositionSyncStore";
import { MobilePositionCard } from "./MobilePositionCard";
import { extractRevertReason } from "@/lib/errorHandling";

type Props = {
  owner: `0x${string}`;
  limit?: number;
};

function PositionsTable({ owner, limit = 10 }: Props) {
  const [page, setPage] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { data, loading, error, refetch } = useActivePosition(
    owner,
    page,
    limit,
  );
  const version = usePositionsSyncStore((s) => s.version);
  const bumpPositions = usePositionsSyncStore((s) => s.bump);
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
      mapOpenPosition(position, prices[position.asset] ?? { price: 0 }),
    );
  }, [data, prices]);

  // Auto-fix: if current page becomes empty (e.g. after closing last position)
  useEffect(() => {
    if (!loading && page > 0 && positions.length === 0) {
      setPage((p) => p - 1);
    }
  }, [positions, loading, page]);

  useEffect(() => {
    refetch();
  }, [version, refetch]);

  const handleClosePosition = async (
    id: bigint,
    asset: "WBTC" | "WETH" | "PAXG",
  ) => {
    try {
      setIsProcessing(true);

      const hash = await closePosition(id, asset);
      await publicClient?.waitForTransactionReceipt({ hash });
      toast.success("Position closed successfully");
      setTimeout(() => {
        bumpPositions();
      }, 1500);
    } catch (err: any) {
      const reason = extractRevertReason(err);

      toast.error(reason);
    } finally {
      setIsProcessing(false);
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

  const renderDesktopTable = () => {
    return (
      <div className="space-y-4">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b border-gray-200">
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
                <tr
                  key={p.id}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <td className="py-3 pl-2 font-medium">{p.asset}-USDC</td>
                  <td>${p.size.toFixed(2)}</td>
                  <td>${p.entryPrice.toLocaleString()}</td>
                  <td>${p.currentPrice.toLocaleString()}</td>
                  <td
                    className={`font-medium ${
                      p.pnl >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {p.pnl >= 0 ? "+" : "-"}${Math.abs(p.pnl).toFixed(2)} (
                    {p.pnlPercent.toFixed(2)}%)
                  </td>
                  <td>{p.profitShare}</td>
                  <td className="opacity-50">{p.maturity}</td>
                  <td className="text-center">
                    <button
                      disabled={isPending || isProcessing}
                      onClick={() => handleClosePosition(BigInt(p.id), p.asset)}
                      className="px-3 py-1 text-sm rounded-lg bg-[#cddff8] hover:bg-[#92befc] text-blue-800 font-semibold disabled:opacity-50"
                    >
                      {isPending || isProcessing ? "Closing..." : "Close"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="hidden md:block">{renderDesktopTable()}</div>

      <div className="md:hidden space-y-4">
        {positions.map((p) => (
          <MobilePositionCard
            key={p.id}
            position={p}
            isPending={isPending}
            onClose={handleClosePosition}
          />
        ))}
      </div>

      {/* Pagination */}
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

export default PositionsTable;
