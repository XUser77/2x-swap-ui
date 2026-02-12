// src/hooks/useOpenPosition.ts
import { useWriteContract, useChainId } from "wagmi";
import {
  X2_PAXG_SWAP_ADDRESS,
  X2_WBTC_SWAP_ADDRESS,
  X2_WETH_SWAP_ADDRESS,
} from "@/config/contracts";
import x2SwapAbi from "@/abi/X2Swap.json";

export function useOpenPosition(asset: string) {
  const chainId = useChainId();
  const { writeContractAsync, isPending } = useWriteContract();

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

  const openPosition = async (
    assetAmount: bigint,
    maxDeviationBps: number,
    route: `0x${string}`,
    path: `0x${string}`,
    deadline: number,
  ) => {
    return writeContractAsync({
      address: swapAddress!,
      abi: x2SwapAbi,
      functionName: "openPosition",
      args: [assetAmount, maxDeviationBps, route, path, deadline],
    });
  };

  return { openPosition, isPending };
}
