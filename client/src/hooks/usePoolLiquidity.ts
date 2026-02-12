// src/hooks/usePoolLiquidity.ts
import { useReadContract, useChainId } from "wagmi";
import { X2_POOL_ADDRESS } from "@/config/contracts";
import { ERC20_ABI } from "@/abi/erc20";
import { TOKENS } from "@/config/tokens";

export function usePoolLiquidity() {
  const chainId = useChainId();

  const usdc = TOKENS.USDC;
  const address = X2_POOL_ADDRESS[chainId];

  const { data } = useReadContract({
    address: usdc.addresses[chainId],
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });

  return {
    liquidity: data ?? 0n,
  };
}
