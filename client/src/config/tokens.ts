// src/config/tokens.ts
import { sepolia } from "wagmi/chains";

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
    [sepolia.id]: "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238",
  },
};

export const TOKENS = {
  USDC,
};
