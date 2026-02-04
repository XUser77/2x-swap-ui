// src/hooks/useUsdcAllowance.ts
import { useAccount, useReadContract, useChainId } from "wagmi";
import { TOKENS } from "@/config/tokens";
import { ERC20_ABI } from "@/abi/erc20";
import { X2_POOL_ADDRESS } from "@/config/contracts";

export function usePoolUsdcAllowance() {
  const { address } = useAccount();
  const chainId = useChainId();

  const usdc = TOKENS.USDC;

  const spender = X2_POOL_ADDRESS[chainId];

  const { data, isLoading, refetch } = useReadContract({
    address: usdc.addresses[chainId],
    abi: ERC20_ABI,
    functionName: "allowance",
    args: address && spender ? [address, spender] : undefined,
    query: { enabled: !!address && !!spender },
  });

  return {
    allowance: data ?? 0n,
    isLoading,
    refetch,
  };
}
