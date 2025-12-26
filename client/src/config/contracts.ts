// src/config/contracts.ts
// import { mainnet } from "wagmi/chains";

import { forkedMainnet } from "./customChain";

type AddressMap = Record<number, `0x${string}`>;

export const X2_POOL_ADDRESS: AddressMap = {
  [forkedMainnet.id]: "0xF4C573868c40fe388cBA162806a9c705640386C9",
  // [mainnet.id]: "0xPOOL_MAINNET_ADDRESS",
};

export const X2_SWAP_ADDRESS: AddressMap = {
  [forkedMainnet.id]: "0xeB02697D88FF777393F3b3c8DE2231038E65828a",
  // [mainnet.id]: "0xSWAP_MAINNET_ADDRESS",
};

export const ORACLE_ADDRESS: AddressMap = {
  [forkedMainnet.id]: "0xORACLE_forkedMainnet_ADDRESS",
};
