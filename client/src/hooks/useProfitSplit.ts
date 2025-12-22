// src/hooks/useProfitSplit.ts
import { useReadContract, useChainId } from "wagmi";
import { X2_SWAP_ADDRESS } from "@/config/contracts";
import x2SwapAbi from "@/abi/X2Swap.json";

export function useProfitSplit() {
  const chainId = useChainId();

  const { data } = useReadContract({
    address: X2_SWAP_ADDRESS[chainId],
    abi: x2SwapAbi,
    functionName: "currentProfitSharing",
  });

  const poolShare = (data ?? 20n) as bigint;
  const traderShare = 100n - poolShare;

  return {
    poolShare,
    traderShare,
  };
}
