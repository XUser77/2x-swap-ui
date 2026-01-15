"use client";

import { useState } from "react";
import { getLeagueBadgeStyle, getRankIcon } from "@/lib/pointHelpers";
import { useLeaderboard } from "@/hooks/useLeaderboard";

const PAGE_SIZE = 10;

export default function LeaderboardTab() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useLeaderboard(page, PAGE_SIZE);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        Loading leaderboard…
      </div>
    );
  }

  if (!data) return null;

  const { data: rows, totalRankedUsers, totalPages } = data;

  const from = (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, totalRankedUsers);

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-6 font-medium text-gray-600">
                Rank
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-600">
                Wallet
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-600">
                League
              </th>
              <th className="text-right py-4 px-6 font-medium text-gray-600">
                Season Points
              </th>
              <th className="text-right py-4 px-6 font-medium text-gray-600">
                Total Points
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((entry) => (
              <tr key={entry.rank} className="border-b border-gray-100">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    {getRankIcon(entry.rank) && (
                      <span className="text-lg">{getRankIcon(entry.rank)}</span>
                    )}
                    <span className="text-gray-900 font-medium">
                      #{entry.rank}
                    </span>
                  </div>
                </td>

                <td className="py-4 px-6 font-mono text-gray-900">
                  {`${entry.wallet.slice(0, 8)}…${entry.wallet.slice(-6)}`}
                </td>

                <td className="py-4 px-6">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getLeagueBadgeStyle(
                      entry.league
                    )}`}
                  >
                    {entry.league}
                  </span>
                </td>

                <td className="py-4 px-6 text-right text-gray-900 font-medium">
                  {entry.seasonPoints.toLocaleString()}
                </td>

                <td className="py-4 px-6 text-right text-gray-900 font-medium">
                  {entry.totalPoints.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 text-sm text-gray-600">
        <div>
          Showing <span className="font-medium">{from}</span>–
          <span className="font-medium">{to}</span> of{" "}
          <span className="font-medium">{totalRankedUsers}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 rounded-lg border border-gray-400 disabled:opacity-50"
          >
            Previous
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 rounded-lg border border-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {isFetching && (
        <div className="px-6 pb-4 text-xs text-gray-400">Updating…</div>
      )}
    </div>
  );
}
