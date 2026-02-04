import { useReadContract, useChainId } from "wagmi";
import { X2_WETH_SWAP_ADDRESS } from "@/config/contracts";
import x2SwapAbi from "@/abi/X2Swap.json";

export function useFeeBps(asset: string) {
  const chainId = useChainId();

  let swapAddress;
  if (asset === "WETH") {
    swapAddress = X2_WETH_SWAP_ADDRESS[chainId];
  }

  const { data, isLoading, error } = useReadContract({
    address: swapAddress,
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
