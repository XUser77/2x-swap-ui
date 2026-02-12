// src/lib/buildPath.ts
import { encodeAbiParameters, type Address } from "viem";
import { encodePacked } from "viem";

export const USDC: Address = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";

export const ASSETS: Record<"WBTC" | "WETH" | "PAXG", Address> = {
  WBTC: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
  WETH: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  PAXG: "0x45804880De22913dAFE09f4980848ECE6EcbAf78",
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
