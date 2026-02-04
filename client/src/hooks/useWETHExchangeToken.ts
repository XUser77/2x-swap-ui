import { useReadContract } from "wagmi";
import X2UniswapV2Exchange from "@/abi/X2UniswapV2Exchange.json";
import { MOCK_UNISWAP_V2 } from "@/constants/trade";

export function useWETHExchangeTokens() {
  const { data: token0 } = useReadContract({
    address: MOCK_UNISWAP_V2,
    abi: X2UniswapV2Exchange,
    functionName: "token0",
  });

  const { data: token1 } = useReadContract({
    address: MOCK_UNISWAP_V2,
    abi: X2UniswapV2Exchange,
    functionName: "token1",
  });

  return { token0, token1 };
}
