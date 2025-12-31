import { useReadContract, useChainId } from "wagmi";
import { parseUnits } from "viem";
import { X2_POOL_ADDRESS } from "@/config/contracts";
import x2PoolAbi from "@/abi/X2Pool.json";

const ASSET_DECIMALS = 6;

export function usePreviewWithdraw(assetAmount: number) {
  const chainId = useChainId();

  const assetsBn =
    assetAmount > 0
      ? parseUnits(assetAmount.toString(), ASSET_DECIMALS)
      : undefined;

  const { data } = useReadContract({
    address: X2_POOL_ADDRESS[chainId],
    abi: x2PoolAbi,
    functionName: "previewDeposit",
    args: assetsBn ? [assetsBn] : undefined,
    query: { enabled: Boolean(assetsBn) },
  });

  return {
    shares: data ?? 0n,
  };
}
