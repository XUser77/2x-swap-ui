import { 
  useWriteContract, 
  useChainId, 
  usePublicClient,
  useAccount 
} from "wagmi";

import { 
  X2_WBTC_SWAP_ADDRESS, 
  X2_WETH_SWAP_ADDRESS 
} from "@/config/contracts";

import x2SwapAbi from "@/abi/X2Swap.json";

export function useOpenPosition(asset: string) {
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const { address } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();

  let swapAddress: `0x${string}`;
  if (asset === "WETH") {
    swapAddress = X2_WETH_SWAP_ADDRESS[chainId];
  }
  if (asset === "WBTC") {
    swapAddress = X2_WBTC_SWAP_ADDRESS[chainId];
  }

  const openPosition = async (
    assetAmount: bigint,
    maxDeviationBps: number,
    route: `0x${string}`,
    path: `0x${string}`,
    deadline: number,
  ) => {
    if (!swapAddress || !publicClient || !address) {
      throw new Error("Missing dependencies");
    }

    // Simulate
    const { request } = await publicClient.simulateContract({
      address: swapAddress,
      abi: x2SwapAbi,
      functionName: "openPosition",
      args: [assetAmount, maxDeviationBps, route, path, deadline],
      account: address,
    });

    return writeContractAsync(request);
  };

  return { openPosition, isPending };
}