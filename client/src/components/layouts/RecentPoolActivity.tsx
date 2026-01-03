import { useState, useMemo, useEffect } from "react";
import { useAccount } from "wagmi";
import { usePoolActivity } from "@/hooks/usePoolActivity";
import { formatUnits } from "viem";
import { useActivityPoolSyncStore } from "@/stores/useActivityPoolSyncStore";

type Activity = {
  type: "DEPOSIT" | "WITHDRAW";
  amount: string;
  date: string;
};

const PAGE_SIZE = 5;

function MobileActivityCard({ a }: { a: Activity }) {
  return (
    <div className="bg-white border rounded-xl p-4 flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <span
          className={`inline-block w-fit px-2 py-1 rounded text-xs font-medium ${
            a.type === "DEPOSIT"
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {a.type}
        </span>

        <span className="text-sm text-gray-500">{a.date}</span>
      </div>

      <div className="font-semibold">${formatUnits(BigInt(a.amount), 6)}</div>
    </div>
  );
}

export function RecentPoolActivity() {
  const { address } = useAccount();
  const [page, setPage] = useState(0);
  const trigger = useActivityPoolSyncStore((s) => s.trigger);

  const { data, loading, error, refetch } = usePoolActivity(
    address as `0x${string}`,
    page,
    PAGE_SIZE
  );

  const activities: Activity[] = useMemo(() => {
    if (!data) return [];

    return data.poolActivitys.items.map((item) => ({
      type: item.type,
      amount: `${Number(item.assets).toString()}`,
      date: new Date(item.timestamp * 1000).toUTCString(),
    }));
  }, [data]);

  const totalCount = data?.poolActivitys.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const hasNextPage = (page + 1) * PAGE_SIZE < totalCount;

  useEffect(() => {
    refetch();
  }, [trigger, refetch]);

  return (
    <div>
      <h3 className="font-semibold mb-2">Recent Pool Activity</h3>

      {loading ? (
        <div className="flex justify-center w-full">Loading activity...</div>
      ) : error ? (
        <div className="flex justify-center w-full">
          Failed to load activity
        </div>
      ) : activities.length === 0 ? (
        <div className="flex justify-center w-full">No pool activity yet</div>
      ) : (
        <>
          <div className="hidden md:block">
            <table className="w-full text-md mb-4">
              <thead className="text-gray-500">
                <tr className="border-b">
                  <th className="text-left py-2">Type</th>
                  <th className="text-left">Amount (USDC)</th>
                  <th className="text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((a, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          a.type === "DEPOSIT"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {a.type}
                      </span>
                    </td>
                    <td>{`$${formatUnits(BigInt(a.amount), 6)}`}</td>
                    <td className="text-gray-500">{a.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="flex flex-col gap-3 md:hidden">
            {activities.map((a, i) => (
              <MobileActivityCard key={i} a={a} />
            ))}
          </div>

          {/* Pagination */}

          <div className="flex items-center justify-between">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              className="px-3 py-1 rounded-md border disabled:opacity-50 bg-blue-900 text-white"
            >
              Previous
            </button>

            <span className="font-semibold text-blue-900">
              Page {page + 1} of {totalPages}
            </span>

            <button
              disabled={!hasNextPage}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 rounded-md border disabled:opacity-50 bg-blue-900 text-white"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
