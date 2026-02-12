import { useWriteContract, useChainId } from "wagmi";
import {
  UNISWAP_BTC_V2,
  UNISWAP_ETH_V2,
  UNISWAP_PAXG_V2,
  X2_PAXG_SWAP_ADDRESS,
  X2_WBTC_SWAP_ADDRESS,
  X2_WETH_SWAP_ADDRESS,
} from "@/config/contracts";
import x2SwapAbi from "@/abi/X2Swap.json";
import { buildPath, ASSETS } from "@/lib/buildPath";
import type { SymbolKey } from "./usePrice";
import { MAX_DEVIATION_BPS } from "@/constants/trade";
import { useWETHExchangeTokens } from "./useWETHExchangeToken";
import { useWBTCExchangeTokens } from "./useWBTCExchangeToken";
import { usePAXGExchangeTokens } from "./usePAXGExchangeToken";

export function useClosePosition() {
  const chainId = useChainId();
  const { writeContractAsync, isPending } = useWriteContract();

  const { token0: TOKEN0WETH, token1: TOKEN1WETH } = useWETHExchangeTokens();
  const { token0: TOKEN0WBTC, token1: TOKEN1WBTC } = useWBTCExchangeTokens();
  const { token0: TOKEN0PAXG, token1: TOKEN1PAXG } = usePAXGExchangeTokens();

  const closePosition = async (id: bigint, asset: SymbolKey) => {
    const assetAddress = ASSETS[asset];

    let token0;
    let token1;
    let swapAddress;
    let exchangeAddress;
    if (asset === "WETH") {
      swapAddress = X2_WETH_SWAP_ADDRESS[chainId];
      token0 = TOKEN0WETH;
      token1 = TOKEN1WETH;
      exchangeAddress = UNISWAP_ETH_V2;
    }
    if (asset === "WBTC") {
      swapAddress = X2_WBTC_SWAP_ADDRESS[chainId];
      token0 = TOKEN0WBTC;
      token1 = TOKEN1WBTC;
      exchangeAddress = UNISWAP_BTC_V2;
    }
    if (asset === "PAXG") {
      swapAddress = X2_PAXG_SWAP_ADDRESS[chainId];
      token0 = TOKEN0PAXG;
      token1 = TOKEN1PAXG;
      exchangeAddress = UNISWAP_PAXG_V2;
    }

    // build reverse path by choosing tokenIn = asset
    const closePath = buildPath(
      assetAddress,
      token0 as `0x${string}`,
      token1 as `0x${string}`,
    );

    const deadline = Math.floor(Date.now() / 1000) + 30 * 60;

    return writeContractAsync({
      address: swapAddress!,
      abi: x2SwapAbi,
      functionName: "closePosition",
      args: [id, MAX_DEVIATION_BPS, exchangeAddress, closePath, deadline],
    });
  };

  return {
    closePosition,
    isPending,
  };
}
