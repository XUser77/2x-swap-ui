// src/hooks/useClosePosition.ts
import { useWriteContract, useChainId } from "wagmi";
import { X2_SWAP_ADDRESS } from "@/config/contracts";
import x2SwapAbi from "@/abi/X2Swap.json";

export function useClosePosition() {
  const chainId = useChainId();
  const { writeContractAsync, isPending } = useWriteContract();

  const closePosition = async (id: bigint) => {
    return writeContractAsync({
      address: X2_SWAP_ADDRESS[chainId],
      abi: x2SwapAbi,
      functionName: "closePosition",
      args: [id, 500],
    });
  };

  return {
    closePosition,
    isPending,
  };
}
