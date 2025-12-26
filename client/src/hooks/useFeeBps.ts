import { useReadContract, useChainId } from "wagmi";
import { X2_SWAP_ADDRESS } from "@/config/contracts";
import x2SwapAbi from "@/abi/X2Swap.json";

export function useFeeBps() {
  const chainId = useChainId();

  const { data, isLoading, error } = useReadContract({
    address: X2_SWAP_ADDRESS[chainId],
    abi: x2SwapAbi,
    functionName: "feeBps",
  });

  const feeBps = (data ?? 0n) as bigint;

  return {
    feeBps,
    isLoading,
    error,
  };
}
