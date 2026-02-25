import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "viem";
import { mainnet } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "2xSwap",
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  chains: [mainnet],
  ssr: false, // IMPORTANT for Vite
  transports: {
    [mainnet.id]: http(import.meta.env.VITE_RPC_URL),
  },
});
