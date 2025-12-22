// src/hooks/useOpenPosition.ts
import { useWriteContract, useChainId } from "wagmi";
import { X2_SWAP_ADDRESS } from "@/config/contracts";
import x2SwapAbi from "@/abi/X2Swap.json";

export function useOpenPosition() {
  const chainId = useChainId();

  const { writeContract, isPending } = useWriteContract();

  const openPosition = (amount: bigint) => {
    writeContract({
      address: X2_SWAP_ADDRESS[chainId],
      abi: x2SwapAbi,
      functionName: "openPosition",
      args: [amount, 300], // 3% oracle deviation
    });
  };

  return {
    openPosition,
    isPending,
  };
}
