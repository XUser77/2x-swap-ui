import axios from "axios";

type SymbolKey = "WBTC" | "WETH" | "PAXG";

const idMap: Record<SymbolKey, string> = {
  WBTC: "bitcoin",
  WETH: "ethereum",
  PAXG: "pax-gold",
};

// 60 second in-memory cache
const cache: Record<
  string,
  { value: number; timestamp: number }
> = {};

export class PriceService {
  static async get24hChange(symbol: string) {
    if (!idMap[symbol as SymbolKey]) {
      throw new Error("Unsupported symbol");
    }

    const now = Date.now();
    const cached = cache[symbol];

    // Return cached value if under 60 seconds old
    if (cached && now - cached.timestamp < 60_000) {
      return {
        symbol,
        change24h: cached.value,
        cached: true,
      };
    }

    const res = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: idMap[symbol as SymbolKey],
          vs_currencies: "usd",
          include_24hr_change: true,
        },
      },
    );

    const value =
      res.data[idMap[symbol as SymbolKey]].usd_24h_change;

    cache[symbol] = {
      value,
      timestamp: now,
    };

    return {
      symbol,
      change24h: value,
      cached: false,
    };
  }
}
