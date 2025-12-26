import type { Chain } from "wagmi/chains";

export const forkedMainnet: Chain = {
  id: 31337,
  name: "Forked 2xSwap",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [import.meta.env.VITE_RPC_URL],
    },
    public: {
      http: [import.meta.env.VITE_RPC_URL],
    },
  },
  testnet: true,
};
