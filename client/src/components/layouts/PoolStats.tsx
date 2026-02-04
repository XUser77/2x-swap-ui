import { TrendingUp } from "lucide-react";
import StatCard from "../fragments/StatCard";
import { InfoTooltip } from "../ui/infoTooltip";
import { useLpBalance } from "@/hooks/useLpBalance";
import { useVolume } from "@/hooks/useVolume";
import { formatUSDCompact } from "@/lib/helpers";
import { useTotalLiquidity } from "@/hooks/useTotalLiquidity";

function PoolStats({ apy }: { apy: number }) {
  const { totalLiquidity } = useTotalLiquidity();
  const { assetValue, lpBalance } = useLpBalance();
  const { data: volumeData, loading: volumeLoading } = useVolume(
    (Math.floor(Date.now() / 1000) - 86400).toString(),
  );

  const volume24h =
    volumeData?.volume_24hs.items.reduce(
      (sum, item) => sum + Number(item.amount),
      0,
    ) ?? 0;

  return (
    <div className="flex flex-wrap justify-between gap-2">
      <StatCard
        title="Total Liquidity"
        content={`$${(Number(totalLiquidity) / 1_000_000).toFixed(2)}`}
        info="USDC on Ethereum"
      />
      <div className="w-[48%] md:min-w-[20vw] md:w-auto flex flex-col justify-center h-32 bg-white rounded-xl p-5">
        <div className="text-sm text-gray-500">
          Estimated APY{" "}
          <InfoTooltip content="Estimated APY is based on recent pool activity and utilization. Actual returns may vary." />
        </div>
        <div className="flex text-2xl mt-2 mb-1 text-green-600">
          {apy.toFixed(1)}%{" "}
          <TrendingUp className="mt-3 ml-1 text-gray-400 w-4 h-4" />
        </div>
        <div className="h-2"></div>
      </div>
      <StatCard
        title="Your Liquidity"
        content={`$${Number(assetValue).toFixed(2)}`}
        info={`${Number(lpBalance).toFixed(2)} LP Tokens`}
      />
      <StatCard
        title="Volume (24h)"
        content={
          volumeLoading ? "—" : `$${formatUSDCompact(volume24h / 1_000_000)}`
        }
        info="24h trading volume"
      />
    </div>
  );
}
export default PoolStats;
