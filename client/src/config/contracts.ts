// src/config/contracts.ts
import { sepolia } from "wagmi/chains";

import type { SymbolKey } from "@/hooks/usePrice";

type AddressMap = Record<number, `0x${string}`>;

export const X2_POOL_ADDRESS: AddressMap = {
  [sepolia.id]: "0xe2c95f4877658a6305247d481d489862baa9a5e1",
  // [mainnet.id]: "0xPOOL_MAINNET_ADDRESS",
};

export const X2_WETH_SWAP_ADDRESS: AddressMap = {
  [sepolia.id]: "0x354a40B470c888F216F66e14e3C930506C38b788",
  // [mainnet.id]: "0xSWAP_MAINNET_ADDRESS",
};

export const X2_WBTC_SWAP_ADDRESS: AddressMap = {
  [sepolia.id]: "0x606A69d06C687aaFd6567f8001218F678c21dFf3",
  // [mainnet.id]: "0xSWAP_MAINNET_ADDRESS",
};

// export const X2_PAXG_SWAP_ADDRESS: AddressMap = {
//   [sepolia.id]: "0x354a40B470c888F216F66e14e3C930506C38b788",
//   // [mainnet.id]: "0xSWAP_MAINNET_ADDRESS",
// };

export const ORACLE_ADDRESS: Record<
  number,
  Record<SymbolKey, `0x${string}`>
> = {
  [sepolia.id]: {
    WETH: "0x49ce8087368E36723106D9e39D99AaBF8E36a428",
    WBTC: "0xcd154d0d095E52e0A18d782AC8F143c5E084f706",
    PAXG: "0x_PAXG_ADDRESS",
  },
};

export const UNISWAP_ETH_V2 = "0x17E616a4032600f430c6d6e77ad12780F83276Ff";
export const UNISWAP_ETH_V3 = "0x87425aaD3882860855f0F7ece4576359792ef341";
export const UNISWAP_BTC_V2 = "0xDd4d6323fc108c8449D10682B115f65Df5aD5A56";
export const UNISWAP_BTC_V3 = "0x92e8113438A46A88F2Efb23B6A67B438ADd11639";
// export const UNISWAP_PAXG_V2 = "0x1B2B5E3a3448d3fbda478B28806b4A62aBD4fD36";
// export const UNISWAP_PAXG_V3 = "0x1B2B5E3a3448d3fbda478B28806b4A62aBD4fD36";
