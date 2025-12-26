import { useWriteContract, useChainId } from "wagmi";
import { X2_SWAP_ADDRESS } from "@/config/contracts";
import x2SwapAbi from "@/abi/X2Swap.json";
import { buildPath, ASSETS } from "@/lib/buildPath";
import type { SymbolKey } from "./usePrice";
import { MAX_DEVIATION_BPS, MOCK_UNISWAP_V2 } from "@/constants/trade";
import { useWETHExchangeTokens } from "./useWETHExchangeToken";

export function useClosePosition() {
  const chainId = useChainId();
  const { writeContractAsync, isPending } = useWriteContract();
  // TODO:
  const { token0: TOKEN0WETH, token1: TOKEN1WETH } = useWETHExchangeTokens();

  const closePosition = async (id: bigint, asset: SymbolKey) => {
    const assetAddress = ASSETS[asset];

    let token0;
    let token1;
    if (asset === "WETH") {
      token0 = TOKEN0WETH;
      token1 = TOKEN1WETH;
    }

    // build reverse path by choosing tokenIn = asset
    const closePath = buildPath(
      assetAddress,
      token0 as `0x${string}`,
      token1 as `0x${string}`
    );

    const deadline = Math.floor(Date.now() / 1000) + 30 * 60;

    return writeContractAsync({
      address: X2_SWAP_ADDRESS[chainId],
      abi: x2SwapAbi,
      functionName: "closePosition",
      args: [id, MAX_DEVIATION_BPS, MOCK_UNISWAP_V2, closePath, deadline],
    });
  };

  return {
    closePosition,
    isPending,
  };
}
