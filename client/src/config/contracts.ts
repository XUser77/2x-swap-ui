// src/config/contracts.ts
// import { mainnet } from "wagmi/chains";

import { forkedMainnet } from "./customChain";

type AddressMap = Record<number, `0x${string}`>;

export const X2_POOL_ADDRESS: AddressMap = {
  [forkedMainnet.id]: "0xF3666759fa555DF124D48cA2eab185a1fA37410c",
  // [mainnet.id]: "0xPOOL_MAINNET_ADDRESS",
};

export const X2_WETH_SWAP_ADDRESS: AddressMap = {
  [forkedMainnet.id]: "0xA467e237721370855f71a9F878D90E78defd643d",
  // [mainnet.id]: "0xSWAP_MAINNET_ADDRESS",
};

export const ORACLE_ADDRESS: AddressMap = {
  [forkedMainnet.id]: "0xORACLE_forkedMainnet_ADDRESS",
};
