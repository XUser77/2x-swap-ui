import EmptyState from "@/components/fragments/EmptyState";
import PoolActionCard from "@/components/layouts/PoolActionCard";
import PoolStats from "@/components/layouts/PoolStats";
import { RecentPoolActivity } from "@/components/layouts/RecentPoolActivity";
import { TVLChart } from "@/components/layouts/TVLChart";
import { PoolProvider } from "@/contexts/PoolContext";
import { useClosedPositionsSince } from "@/hooks/useClosedPositionsSince";
import { calculatePoolApy } from "@/lib/helpers";
import { useAccount } from "wagmi";

function Pool() {
  const { isConnected } = useAccount();
  let apy = 0;
  const since = (Math.floor(Date.now() / 1000) - 30 * 86400).toString();

  const { data, loading } = useClosedPositionsSince(since);

  if (!loading) {
    apy = calculatePoolApy({
      positions: data?.positions.items!,
      windowStart: Math.floor(Date.now() / 1000) - 30 * 86400, // last 30 days
    });
  }

  return (
    <PoolProvider apy={apy}>
      <div className="bg-[#BFD7F8]">
        <div className="max-w-450 mx-auto">
          <div className="mx-10 py-7 flex flex-col gap-4 ">
            <PoolStats apy={apy} />
            <div className="flex flex-col md:flex-row w-full gap-6 min-h-[80vh]">
              <TVLChart />
              <PoolActionCard />
            </div>
            <div className="bg-white rounded-xl p-6 mb-15">
              {!isConnected ? (
                <EmptyState message="Pool Activity Unavailable" />
              ) : (
                <RecentPoolActivity />
              )}
            </div>
          </div>
        </div>
      </div>
    </PoolProvider>
  );
}
export default Pool;
