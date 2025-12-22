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
    [forkedMainnet.id]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606EB48",
  },
};

export const TOKENS = {
  USDC,
};
