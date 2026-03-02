import {
  useWriteContract,
  useChainId,
  usePublicClient,
  useAccount,
} from "wagmi";

import {
  UNISWAP_BTC_V2,
  UNISWAP_ETH_V2,
  X2_WBTC_SWAP_ADDRESS,
  X2_WETH_SWAP_ADDRESS,
} from "@/config/contracts";

import x2SwapAbi from "@/abi/X2Swap.json";
import {buildPath, ASSETS, USDC} from "@/lib/buildPath";
import { MAX_DEVIATION_BPS } from "@/constants/trade";
import { useWETHExchangeTokens } from "./useWETHExchangeToken";
import { useWBTCExchangeTokens } from "./useWBTCExchangeToken";

export function useClosePosition() {
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const { address } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();

  const { token0: TOKEN0WETH, token1: TOKEN1WETH } = useWETHExchangeTokens();
  const { token0: TOKEN0WBTC, token1: TOKEN1WBTC } = useWBTCExchangeTokens();

  const closePosition = async (id: bigint, asset: "WBTC" | "WETH") => {
    if (!publicClient || !address) {
      throw new Error("Wallet not connected");
    }

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

    if (!swapAddress || !token0 || !token1) {
      throw new Error("Invalid asset configuration");
    }

    const closePath = asset === "WETH" ? buildPath(
      ASSETS.WETH as `0x${string}`,
      USDC as `0x${string}`,
    ) : asset === "WBTC" ? buildPath(
      ASSETS.WBTC as `0x${string}`,
      ASSETS.WETH as `0x${string}`,
      USDC as `0x${string}`,
    ) : null;

    const deadline = Math.floor(Date.now() / 1000) + 30 * 60;

    // Simulate
    const { request } = await publicClient.simulateContract({
      address: swapAddress,
      abi: x2SwapAbi,
      functionName: "closePosition",
      args: [id, MAX_DEVIATION_BPS, exchangeAddress, closePath, deadline],
      account: address,
    });

    return writeContractAsync(request);
  };

  return {
    closePosition,
    isPending,
  };
}
