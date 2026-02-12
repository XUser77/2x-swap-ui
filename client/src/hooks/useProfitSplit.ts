// src/hooks/useProfitSplit.ts
import { useReadContract, useChainId } from "wagmi";
import {
  X2_PAXG_SWAP_ADDRESS,
  X2_WBTC_SWAP_ADDRESS,
  X2_WETH_SWAP_ADDRESS,
} from "@/config/contracts";
import x2SwapAbi from "@/abi/X2Swap.json";

export function useProfitSplit(asset: string) {
  const chainId = useChainId();

  let swapAddress;

  if (asset === "WETH") {
    swapAddress = X2_WETH_SWAP_ADDRESS[chainId];
  }
  if (asset === "WBTC") {
    swapAddress = X2_WBTC_SWAP_ADDRESS[chainId];
  }
  if (asset === "PAXG") {
    swapAddress = X2_PAXG_SWAP_ADDRESS[chainId];
  }

  const { data } = useReadContract({
    address: swapAddress,
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
