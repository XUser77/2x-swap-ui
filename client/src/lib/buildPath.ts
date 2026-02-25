// src/lib/buildPath.ts
import { encodeAbiParameters, type Address } from "viem";
import { encodePacked } from "viem";

export const USDC: Address = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

export const ASSETS: Record<"WBTC" | "WETH", Address> = {
  WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
};

export function buildPath(tokenIn: Address, token0: Address, token1: Address) {
  let path: Address[];

  if (tokenIn.toLowerCase() === token0.toLowerCase()) {
    path = [token0, token1];
  } else {
    path = [token1, token0];
  }

  return encodeAbiParameters([{ type: "address[]" }], [path]);
}

export function buildV3Path(
  tokenIn: Address,
  token0: Address,
  token1: Address,
  fee: number, // e.g. 500, 3000, 10000
) {
  const [from, to] =
    tokenIn.toLowerCase() === token0.toLowerCase()
      ? [token0, token1]
      : [token1, token0];

  return encodePacked(["address", "uint24", "address"], [from, fee, to]);
}
