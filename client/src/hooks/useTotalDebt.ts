import { useReadContract, useChainId } from "wagmi";
import { X2_POOL_ADDRESS } from "@/config/contracts";
import x2PoolAbi from "@/abi/X2Pool.json";

export function useTotalDebt() {
  const chainId = useChainId();

  const { data, isLoading, error } = useReadContract({
    address: X2_POOL_ADDRESS[chainId],
    abi: x2PoolAbi,
    functionName: "totalDebt",
  });

  const totalDebt = (data ?? 0n) as bigint;

  return {
    totalDebt,
    isLoading,
    error,
  };
}
