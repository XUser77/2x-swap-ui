import { useAccount, useReadContract, useChainId } from "wagmi";
import { X2_POOL_ADDRESS } from "@/config/contracts";
import x2PoolAbi from "@/abi/X2Pool.json";

import { formatUnits } from "viem";

export function useLpBalance() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const { data: lpBalance } = useReadContract({
    address: X2_POOL_ADDRESS[chainId],
    abi: x2PoolAbi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address && isConnected) },
  });

  const { data: assetValue } = useReadContract({
    address: X2_POOL_ADDRESS[chainId],
    abi: x2PoolAbi,
    functionName: "convertToAssets",
    args: lpBalance ? [lpBalance] : undefined,
    query: {
      enabled: Boolean(address && isConnected && lpBalance !== undefined),
    },
  });

  return {
    lpBalance: lpBalance ? formatUnits(BigInt(Number(lpBalance)), 6) : "0",
    assetValue: assetValue ? formatUnits(BigInt(Number(assetValue)), 6) : "0",
  };
}
