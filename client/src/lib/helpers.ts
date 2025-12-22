export function parseUnits(value: number, decimals: number): bigint {
  return BigInt(Math.floor(value * 10 ** decimals));
}
