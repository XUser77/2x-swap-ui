// src/hooks/useApproveUsdc.ts
import { useWriteContract, useChainId } from "wagmi";
import { TOKENS } from "@/config/tokens";
import { ERC20_ABI } from "@/abi/erc20";

export function useApproveUsdc() {
  const chainId = useChainId();
  const usdc = TOKENS.USDC;

  const { writeContractAsync, isPending } = useWriteContract();

  const approve = async (spender: `0x${string}`, amount: bigint) => {
    return writeContractAsync({
      address: usdc.addresses[chainId],
      abi: ERC20_ABI,
      functionName: "approve",
      args: [spender, amount],
    });
  };

  return {
    approve,
    isPending,
  };
}
