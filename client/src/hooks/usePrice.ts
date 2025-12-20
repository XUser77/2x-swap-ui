import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type SymbolKey = "BTC" | "ETH" | "PAXG";

const idMap: Record<SymbolKey, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
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

  return {
    price: data.usd as number,
    change24h: data.usd_24h_change as number,
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
