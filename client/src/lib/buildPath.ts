// src/lib/buildPath.ts
import { encodeAbiParameters, type Address } from "viem";
import { encodePacked } from "viem";

export const USDC: Address = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

export const ASSETS: Record<"WBTC" | "WETH", Address> = {
  WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
};

export function buildPath(...path: Address[]) {
  return encodeAbiParameters([{ type: "address[]" }], [path]);
}

export function buildV3Path(...path: any[]) {
  const types: string[] = [];
  const params = [];

  types.push("address");
  params.push(path[0]);
  for (let i=1; i<path.length; i+=2) {
    types.push("uint24");
    types.push("address");
    params.push(path[i]);
    params.push(path[i+1]);
  }

  return encodePacked(types, params);
}
