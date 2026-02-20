import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "viem";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "2xSwap",
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  chains: [sepolia],
  ssr: false, // IMPORTANT for Vite
  transports: {
    [sepolia.id]: http(import.meta.env.VITE_RPC_URL),
  },
});
