// src/config/contracts.ts
// import { mainnet } from "wagmi/chains";

import { forkedMainnet } from "./customChain";

type AddressMap = Record<number, `0x${string}`>;

export const X2_POOL_ADDRESS: AddressMap = {
  [forkedMainnet.id]: "0xcada184f2D22f4214d40E87533eA97240153524E",
  // [mainnet.id]: "0xPOOL_MAINNET_ADDRESS",
};

export const X2_SWAP_ADDRESS: AddressMap = {
  [forkedMainnet.id]: "0x30cE1101F89D236E3709408809331794c109bE36",
  // [mainnet.id]: "0xSWAP_MAINNET_ADDRESS",
};

export const FEE_GOVERNANCE_ADDRESS: AddressMap = {
  [forkedMainnet.id]: "0xFEE_GOV_forkedMainnet_ADDRESS",
};

export const ORACLE_ADDRESS: AddressMap = {
  [forkedMainnet.id]: "0xORACLE_forkedMainnet_ADDRESS",
};
