"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Row from "../fragments/Row";

function OpenSwapWidget() {
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState(50);

  const leverage = 2;
  const totalPositionSize = amount * leverage * 500;
  const matchedLiquidity = totalPositionSize / 2;

  return (
    <div className="flex-1 w-full max-w-md bg-white rounded-md p-5 border border-gray-300">
      <h2 className="text-lg font-semibold mb-4">Open Long 2x Position</h2>

      {/* Amount input (readable even if not connected) */}
      <div className="mb-4">
        <label className="text-sm text-gray-500 mb-1 block">
          Available to Trade
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          disabled={!isConnected}
          className="w-full border rounded-lg px-3 py-2 text-sm disabled:bg-gray-100"
        />
      </div>

      <div className="mb-5">
        <input
          type="range"
          min={0}
          max={100}
          value={amount}
          disabled={!isConnected}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full accent-sky-500 disabled:opacity-50"
        />
      </div>

      {/* CTA */}
      {!isConnected ? (
        <ConnectButton.Custom>
          {({ openConnectModal }) => (
            <button
              onClick={openConnectModal}
              className="w-full bg-black text-white font-semibold py-3 rounded-xl"
            >
              Connect Wallet
            </button>
          )}
        </ConnectButton.Custom>
      ) : (
        <button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl transition">
          Open 2x position
        </button>
      )}

      <div className="my-5 border-t" />

      {/* Summary (always visible) */}
      <div className="space-y-2 text-sm">
        <Row
          label="Matched liquidity"
          value={`$${matchedLiquidity.toLocaleString()}`}
        />
        <Row
          label="Total position size"
          value={`$${totalPositionSize.toLocaleString()}`}
        />
        <Row label="Leverage" value="2x" />
        <Row label="Profit split" value="80% trader / 20% pool" />
        <Row label="Auto-close" value="1 year" />
        <Row label="Available pool liquidity" value="$50,000" />
      </div>
    </div>
  );
}

export default OpenSwapWidget;
