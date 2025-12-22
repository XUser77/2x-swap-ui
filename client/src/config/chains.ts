// src/config/chains.ts
// import { mainnet } from "wagmi/chains";

import { forkedMainnet } from "./customChain";

// export const supportedChains = [mainnet];
// export const defaultChain = mainnet;

export const supportedChains = [forkedMainnet];
export const defaultChain = forkedMainnet;
