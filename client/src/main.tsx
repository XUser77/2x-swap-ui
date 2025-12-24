import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import App from "./App.tsx";
import Pool from "./pages/Pool.tsx";
import Swap from "./pages/Swap.tsx";
import HomeLayout from "./components/layouts/HomeLayout.tsx";
import AppLayout from "./components/layouts/AppLayout.tsx";
import { config } from "./lib/wagmi.ts";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "./apollo/client";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <ApolloProvider client={apolloClient}>
          <RainbowKitProvider>
            <BrowserRouter>
              <Routes>
                {/* Home with its own navbar */}
                <Route element={<HomeLayout />}>
                  <Route path="/" element={<App />} />
                </Route>

                {/* App pages with another navbar */}
                <Route element={<AppLayout />}>
                  <Route path="/pool" element={<Pool />} />
                  <Route path="/swap" element={<Swap />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </RainbowKitProvider>
        </ApolloProvider>
      </WagmiProvider>
    </QueryClientProvider>
  </StrictMode>
);
