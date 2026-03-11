import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  walletConnectWallet,
  coinbaseWallet,
  trustWallet,
  phantomWallet,
  injectedWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

const connectors = connectorsForWallets(
  [
    {
      groupName: "Popular",
      wallets: [
        metaMaskWallet,
        trustWallet,
        phantomWallet,
        coinbaseWallet,
        injectedWallet,
        walletConnectWallet,
      ],
    },
  ],
  {
    appName: "2xSwap",
    projectId,
  }
);

export const config = createConfig({
  connectors,
  chains: [mainnet],
  ssr: false,
  transports: {
    [mainnet.id]: http(import.meta.env.VITE_RPC_URL),
  },
});
