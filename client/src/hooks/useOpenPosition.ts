// src/hooks/useOpenPosition.ts
import { useWriteContract, useChainId } from "wagmi";
import { X2_SWAP_ADDRESS } from "@/config/contracts";
import x2SwapAbi from "@/abi/X2Swap.json";
import { MOCK_UNISWAP_V2 } from "@/constants/trade";

export function useOpenPosition() {
  const chainId = useChainId();
  const { writeContractAsync, isPending } = useWriteContract();

  const openPosition = async (
    assetAmount: bigint,
    maxDeviationBps: number,
    path: `0x${string}`,
    deadline: number
  ) => {
    return writeContractAsync({
      address: X2_SWAP_ADDRESS[chainId],
      abi: x2SwapAbi,
      functionName: "openPosition",
      args: [assetAmount, maxDeviationBps, MOCK_UNISWAP_V2, path, deadline],
    });
  };

  return { openPosition, isPending };
}
