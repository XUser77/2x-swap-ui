// src/hooks/useUsdcAllowance.ts
import { useAccount, useReadContract, useChainId } from "wagmi";
import { TOKENS } from "@/config/tokens";
import { ERC20_ABI } from "@/abi/erc20";
import { X2_WBTC_SWAP_ADDRESS, X2_WETH_SWAP_ADDRESS } from "@/config/contracts";

export function useUsdcAllowance(asset: string) {
  const { address } = useAccount();
  const chainId = useChainId();

  const usdc = TOKENS.USDC;
  let spender;
  if (asset === "WETH") {
    spender = X2_WETH_SWAP_ADDRESS[chainId];
  }
  if (asset === "WBTC") {
    spender = X2_WBTC_SWAP_ADDRESS[chainId];
  }

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
