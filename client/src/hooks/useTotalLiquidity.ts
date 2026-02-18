import { useReadContract, useChainId } from "wagmi";
import { X2_POOL_ADDRESS } from "@/config/contracts";
import x2PoolAbi from "@/abi/X2Pool.json";

export function useTotalLiquidity() {
  const chainId = useChainId();
  let tvl;

  const { data: assets, isLoading: assetsLoading } = useReadContract({
    address: X2_POOL_ADDRESS[chainId],
    abi: x2PoolAbi,
    functionName: "totalAssets",
  });

  if (!assetsLoading) {
    tvl = assets as bigint;
  }

  return {
    totalLiquidity: tvl ?? 0n,
  };
}
