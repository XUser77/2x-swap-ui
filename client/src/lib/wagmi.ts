import { forkedMainnet } from "@/config/customChain";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
// import { mainnet, sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "2xSwap",
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  // chains: [mainnet, sepolia],
  chains: [forkedMainnet],
  ssr: false, // IMPORTANT for Vite
});
