// src/hooks/useUsdcBalance.ts
import { useAccount, useReadContract, useChainId } from "wagmi";
import { TOKENS } from "@/config/tokens";
import { ERC20_ABI } from "@/abi/erc20";

export function useUsdcBalance() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const usdc = TOKENS.USDC;

  const { data, isLoading } = useReadContract({
    address: usdc.addresses[chainId],
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address && isConnected) },
  });

  return {
    balance: data ?? 0n,
    decimals: usdc.decimals,
    isLoading,
  };
}
