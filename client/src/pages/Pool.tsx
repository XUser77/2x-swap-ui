import EmptyState from "@/components/fragments/EmptyState";
import PoolActionCard from "@/components/layouts/PoolActionCard";
import PoolStats from "@/components/layouts/PoolStats";
import { RecentPoolActivity } from "@/components/layouts/RecentPoolActivity";
import { TVLChart } from "@/components/layouts/TVLChart";
import { PoolProvider } from "@/contexts/PoolContext";
import { useAccount } from "wagmi";

function Pool() {
  const { isConnected } = useAccount();
  const apy = 1840;

  return (
    <PoolProvider apy={apy}>
      <div className="bg-[#BFD7F8]">
        <div className="max-w-450 mx-auto">
          <div className="mx-10 py-7 flex flex-col gap-4 ">
            <PoolStats apy={apy} />
            <div className="flex w-full gap-6 min-h-[80vh]">
              <TVLChart />
              <PoolActionCard />
            </div>
            <div className="bg-white rounded-xl p-6">
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
