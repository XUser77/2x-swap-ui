// src/hooks/useOpenPosition.ts
import { useWriteContract, useChainId } from "wagmi";
import { X2_WETH_SWAP_ADDRESS } from "@/config/contracts";
import x2SwapAbi from "@/abi/X2Swap.json";
import { MOCK_UNISWAP_V2 } from "@/constants/trade";

export function useOpenPosition(asset: string) {
  const chainId = useChainId();
  const { writeContractAsync, isPending } = useWriteContract();

  let swapAddress;
  if (asset === "WETH") {
    swapAddress = X2_WETH_SWAP_ADDRESS[chainId];
  }

  const openPosition = async (
    assetAmount: bigint,
    maxDeviationBps: number,
    path: `0x${string}`,
    deadline: number,
  ) => {
    return writeContractAsync({
      address: swapAddress!,
      abi: x2SwapAbi,
      functionName: "openPosition",
      args: [assetAmount, maxDeviationBps, MOCK_UNISWAP_V2, path, deadline],
    });
  };

  return { openPosition, isPending };
}
