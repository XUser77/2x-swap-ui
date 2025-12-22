// src/hooks/usePoolLiquidity.ts
import { useReadContract, useChainId } from "wagmi";
import { X2_POOL_ADDRESS } from "@/config/contracts";
import x2PoolAbi from "@/abi/X2Pool.json";

export function usePoolLiquidity() {
  const chainId = useChainId();

  const { data } = useReadContract({
    address: X2_POOL_ADDRESS[chainId],
    abi: x2PoolAbi,
    functionName: "totalAssets",
  });

  return {
    liquidity: (data ?? 0n) as bigint,
  };
}
