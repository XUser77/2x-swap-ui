import { useReadContract } from "wagmi";
import X2UniswapV2Exchange from "@/abi/X2UniswapV2Exchange.json";

const X2_UNISWAP_EXCHANGE = "0x536ADf9f074159B303001DF782ceeCF8e8f92dC5";

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
