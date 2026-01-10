import { useReadContract } from "wagmi";
import X2UniswapV2Exchange from "@/abi/X2UniswapV2Exchange.json";

const X2_UNISWAP_EXCHANGE = "0xcc61cEB32C2E6e04f1787Ce4B61D8BD78aE4922E";

export function useWETHExchangeTokens() {
  const { data: token0 } = useReadContract({
    address: X2_UNISWAP_EXCHANGE,
    abi: X2UniswapV2Exchange,
    functionName: "token0",
  });

  const { data: token1 } = useReadContract({
    address: X2_UNISWAP_EXCHANGE,
    abi: X2UniswapV2Exchange,
    functionName: "token1",
  });

  return { token0, token1 };
}
