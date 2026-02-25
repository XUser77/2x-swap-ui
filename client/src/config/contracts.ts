// src/config/contracts.ts
import { mainnet } from "wagmi/chains";

import type { SymbolKey } from "@/hooks/usePrice";

type AddressMap = Record<number, `0x${string}`>;

export const X2_POOL_ADDRESS: AddressMap = {
  [mainnet.id]: "0x2a315Fef86916B30905086C85A9cB55E5DCD7ED3",
};

export const X2_WETH_SWAP_ADDRESS: AddressMap = {
  [mainnet.id]: "0x3E77Ad644B4F5FF6AE0B9893bd7bD3CD0136A578",
};

export const X2_WBTC_SWAP_ADDRESS: AddressMap = {
  [mainnet.id]: "0x8d47d68c92C445c4b583cFfAC6016730CB2059e5",
};

export const ORACLE_ADDRESS: Record<
  number,
  Record<SymbolKey, `0x${string}`>
> = {
  [mainnet.id]: {
    WETH: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    WBTC: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
  },
};

export const UNISWAP_ETH_V2 = "0x17E616a4032600f430c6d6e77ad12780F83276Ff";
export const UNISWAP_ETH_V3 = "0x87425aaD3882860855f0F7ece4576359792ef341";
export const UNISWAP_BTC_V2 = "0xDd4d6323fc108c8449D10682B115f65Df5aD5A56";
export const UNISWAP_BTC_V3 = "0x92e8113438A46A88F2Efb23B6A67B438ADd11639";
// export const UNISWAP_PAXG_V2 = "0x1B2B5E3a3448d3fbda478B28806b4A62aBD4fD36";
// export const UNISWAP_PAXG_V3 = "0x1B2B5E3a3448d3fbda478B28806b4A62aBD4fD36";
