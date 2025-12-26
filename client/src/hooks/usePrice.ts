import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type SymbolKey = "WBTC" | "WETH" | "PAXG";

const idMap: Record<SymbolKey, string> = {
  WBTC: "bitcoin",
  WETH: "ethereum",
  PAXG: "pax-gold",
};

async function fetchPrice(symbol: SymbolKey) {
  const res = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
    params: {
      ids: idMap[symbol],
      vs_currencies: "usd",
      include_24hr_change: true,
    },
  });

  const data = res.data[idMap[symbol]];

  const price = data.usd as number;
  const changePercent = data.usd_24h_change as number;

  // derive absolute point change
  const price24hAgo = price / (1 + changePercent / 100);
  const changePoint = price - price24hAgo;

  return {
    price,
    change24h: changePercent,
    change24hPoint: changePoint,
  };
}

export function usePrice(symbol: SymbolKey) {
  return useQuery({
    queryKey: ["price", symbol],
    queryFn: () => fetchPrice(symbol),

    refetchInterval: 5000, // poll every 5s
    refetchIntervalInBackground: true,
  });
}
