import { useReadContract, useChainId } from "wagmi";
import { X2_POOL_ADDRESS } from "@/config/contracts";
import x2PoolAbi from "@/abi/X2Pool.json";
import { formatUnits } from "viem";

const ONE_LP = 1_000_000n; // 1 LP with 6 decimals

export function useLpPrice() {
  const chainId = useChainId();

  const { data: lpPrice } = useReadContract({
    address: X2_POOL_ADDRESS[chainId],
    abi: x2PoolAbi,
    functionName: "convertToAssets",
    args: [ONE_LP],
  });

  return { lpPrice: lpPrice ? formatUnits(BigInt(Number(lpPrice)), 6) : "0" };
}
