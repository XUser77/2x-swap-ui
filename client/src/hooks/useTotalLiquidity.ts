import { useReadContract, useChainId } from "wagmi";
import { X2_POOL_ADDRESS } from "@/config/contracts";
import x2PoolAbi from "@/abi/X2Pool.json";

export function useTotalLiquidity() {
  const chainId = useChainId();

  const { data: assets } = useReadContract({
    address: X2_POOL_ADDRESS[chainId],
    abi: x2PoolAbi,
    functionName: "totalAssets",
  });
  const { data: debt } = useReadContract({
    address: X2_POOL_ADDRESS[chainId],
    abi: x2PoolAbi,
    functionName: "totalDebt",
  });

  const tvl = (assets as bigint) + (debt as bigint);

  return {
    totalLiquidity: tvl,
  };
}
