import { forkedMainnet } from "@/config/customChain";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "viem";
// import { mainnet, sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "2xSwap",
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  // chains: [mainnet, sepolia],
  chains: [forkedMainnet],
  ssr: false, // IMPORTANT for Vite
  transports: {
    [forkedMainnet.id]: http("http://185.146.3.206:8545"),
  },
});
