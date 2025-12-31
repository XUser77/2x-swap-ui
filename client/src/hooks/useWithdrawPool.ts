import { useWriteContract, useChainId, useAccount } from "wagmi";
import { X2_POOL_ADDRESS } from "@/config/contracts";
import x2PoolAbi from "@/abi/X2Pool.json";

export function useWithdrawPool() {
  const chainId = useChainId();
  const { address } = useAccount();

  const { writeContractAsync, isPending } = useWriteContract();

  const withdraw = async (assets: bigint) => {
    return writeContractAsync({
      address: X2_POOL_ADDRESS[chainId],
      abi: x2PoolAbi,
      functionName: "withdraw",
      args: [assets, address, address],
    });
  };

  return {
    withdraw,
    isPending,
  };
}
