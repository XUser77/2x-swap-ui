// src/config/tokens.ts
// import { mainnet } from "wagmi/chains";

import { forkedMainnet } from "./customChain";

export type TokenConfig = {
  symbol: string;
  name: string;
  decimals: number;
  addresses: Record<number, `0x${string}`>;
};

export const USDC: TokenConfig = {
  symbol: "USDC",
  name: "USD Coin",
  decimals: 6,
  addresses: {
    [forkedMainnet.id]: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  },
};

export const TOKENS = {
  USDC,
};
