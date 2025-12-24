import { usePrice, type SymbolKey } from "./usePrice";

export type PriceMap = Record<
  SymbolKey,
  { price: number; change24h: number } | undefined
>;

export function usePositionPrice() {
  const btc = usePrice("BTC");
  const eth = usePrice("ETH");
  const paxg = usePrice("PAXG");

  const prices: PriceMap = {
    BTC: btc.data,
    ETH: eth.data,
    PAXG: paxg.data,
  };

  return {
    prices,
    isLoading: btc.isLoading || eth.isLoading || paxg.isLoading,
  };
}
