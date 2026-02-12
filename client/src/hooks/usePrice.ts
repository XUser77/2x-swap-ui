import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useReadContract, useChainId } from "wagmi";
import { formatUnits } from "viem";
import fakeOracleAbi from "@/abi/FakeOracle.json";
import { ORACLE_ADDRESS } from "@/config/contracts";

export type SymbolKey = "WBTC" | "WETH" | "PAXG";

const idMap: Record<SymbolKey, string> = {
  WBTC: "bitcoin",
  WETH: "ethereum",
  PAXG: "pax-gold",
};

export function usePrice(symbol: SymbolKey) {
  const chainId = useChainId();
  const oracle = ORACLE_ADDRESS[chainId]?.[symbol];

  // ----------- ON-CHAIN PRICE -----------
  const { data: roundData } = useReadContract({
    address: oracle,
    abi: fakeOracleAbi,
    functionName: "latestRoundData",
  }) as {
    data: [bigint, bigint, bigint, bigint, bigint] | undefined;
  };

  const { data: decimals } = useReadContract({
    address: oracle,
    abi: fakeOracleAbi,
    functionName: "decimals",
  }) as {
    data: number | undefined;
  };

  // ----------- OFF-CHAIN 24H DATA -----------
  const cgQuery = useQuery({
    queryKey: ["cg-24h", symbol],
    queryFn: async () => {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price",
        {
          params: {
            ids: idMap[symbol],
            vs_currencies: "usd",
            include_24hr_change: true,
          },
        },
      );

      const data = res.data[idMap[symbol]];
      return data.usd_24h_change as number;
    },
    refetchInterval: 60_000,
  });

  // ----------- FORMAT FINAL RESULT -----------
  const price =
    roundData && decimals !== undefined
      ? Number(formatUnits(BigInt(roundData[1]), decimals))
      : undefined;

  const changePercent = cgQuery.data;

  const changePoint =
    price && changePercent !== undefined
      ? price - price / (1 + changePercent / 100)
      : undefined;

  return {
    data:
      price !== undefined && changePercent !== undefined
        ? {
            price,
            change24h: changePercent,
            change24hPoint: changePoint!,
          }
        : undefined,

    isLoading: !price || cgQuery.isLoading,
  };
}
