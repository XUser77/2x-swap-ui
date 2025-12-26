import { usePrice, type SymbolKey } from "./usePrice";

export type PriceMap = Record<
  SymbolKey,
  { price: number; change24h: number } | undefined
>;

export function usePositionPrice() {
  const WBTC = usePrice("WBTC");
  const WETH = usePrice("WETH");
  const paxg = usePrice("PAXG");

  const prices: PriceMap = {
    WBTC: WBTC.data,
    WETH: WETH.data,
    PAXG: paxg.data,
  };

  return {
    prices,
    isLoading: WBTC.isLoading || WETH.isLoading || paxg.isLoading,
  };
}
