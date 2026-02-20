import {
  useWriteContract,
  useChainId,
  useAccount,
  usePublicClient,
} from "wagmi";

import { X2_POOL_ADDRESS } from "@/config/contracts";
import x2PoolAbi from "@/abi/X2Pool.json";

export function useWithdrawPool() {
  const chainId = useChainId();
  const { address } = useAccount();
  const publicClient = usePublicClient();

  const { writeContractAsync, isPending } = useWriteContract();

  const withdraw = async (assets: bigint) => {
    if (!address || !publicClient) {
      throw new Error("Wallet not connected");
    }

    const poolAddress = X2_POOL_ADDRESS[chainId];

    if (!poolAddress) {
      throw new Error("Invalid chain configuration");
    }

    // Simulate
    const { request } = await publicClient.simulateContract({
      address: poolAddress,
      abi: x2PoolAbi,
      functionName: "withdraw",
      args: [assets, address, address],
      account: address,
    });

    return writeContractAsync(request);
  };

  return {
    withdraw,
    isPending,
  };
}
