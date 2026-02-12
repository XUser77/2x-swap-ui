import { useReadContract } from "wagmi";
import X2UniswapV2Exchange from "@/abi/X2UniswapV2Exchange.json";
import { UNISWAP_BTC_V2 } from "@/config/contracts";

export function useWBTCExchangeTokens() {
  const { data: token0 } = useReadContract({
    address: UNISWAP_BTC_V2,
    abi: X2UniswapV2Exchange,
    functionName: "token0",
  });

  const { data: token1 } = useReadContract({
    address: UNISWAP_BTC_V2,
    abi: X2UniswapV2Exchange,
    functionName: "token1",
  });

  return { token0, token1 };
}
