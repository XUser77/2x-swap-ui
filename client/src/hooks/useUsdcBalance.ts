// src/hooks/useUsdcBalance.ts
import { useAccount, useReadContract, useChainId } from "wagmi";
import { TOKENS } from "@/config/tokens";
import { ERC20_ABI } from "@/abi/erc20";
import { forkedMainnet } from "@/config/customChain";

export function useUsdcBalance() {
  const { address } = useAccount();
  const chainId = useChainId();

  const usdc = TOKENS.USDC;

  console.log({
    walletAddress: address,
    chainId,
    expectedChainId: forkedMainnet.id,
    usdcAddress: usdc.addresses[chainId],
  });

  const { data, isLoading } = useReadContract({
    address: usdc.addresses[chainId],
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });
  console.log(data); // undefined

  return {
    balance: data ?? 0n,
    decimals: usdc.decimals,
    isLoading,
  };
}
