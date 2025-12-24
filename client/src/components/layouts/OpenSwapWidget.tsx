"use client";

import { useState } from "react";
import { useAccount, useChainId, usePublicClient } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Row from "../fragments/Row";

import { useUsdcBalance } from "@/hooks/useUsdcBalance";
import { useProfitSplit } from "@/hooks/useProfitSplit";
import { usePoolLiquidity } from "@/hooks/usePoolLiquidity";
import { useOpenPosition } from "@/hooks/useOpenPosition";
import { parseUnits } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import { useApproveUsdc } from "@/hooks/useApproveUsdc";
import { useUsdcAllowance } from "@/hooks/useUsdcAllowance";
import { X2_SWAP_ADDRESS } from "@/config/contracts";

function OpenSwapWidget() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const publicClient = usePublicClient();

  const [amount, setAmount] = useState(0);

  const leverage = 2;

  // READ
  const { balance: usdcBalance, decimals } = useUsdcBalance();
  const { poolShare, traderShare } = useProfitSplit();
  const { liquidity } = usePoolLiquidity();
  const { allowance, refetch: refetchAllowance } = useUsdcAllowance();

  // WRITE
  const { openPosition, isPending } = useOpenPosition();
  const { approve } = useApproveUsdc();

  const amountBn = parseUnits(amount, decimals);

  const totalPositionSize = amount * leverage;
  const matchedLiquidity = totalPositionSize / 2;

  const maxAmount = Number(usdcBalance / 10n ** BigInt(decimals));
  const availableLiquidity = Number(liquidity / 10n ** BigInt(decimals));

  const insufficientLiquidity = amount > availableLiquidity;

  const canSubmit =
    isConnected &&
    amount > 0 &&
    amount <= maxAmount &&
    !insufficientLiquidity &&
    !isPending;

  const handleOpenPosition = async () => {
    try {
      const spender = X2_SWAP_ADDRESS[chainId];

      // 1. Approve if needed
      if (allowance < amountBn) {
        toast.loading("Approving USDC...", { id: "approve" });

        const approveHash = await approve(spender, amountBn);
        await publicClient?.waitForTransactionReceipt({ hash: approveHash });

        toast.success("USDC approved", { id: "approve" });
        await refetchAllowance();
      }

      // 2. Open position
      toast.loading("Opening position...", { id: "open" });

      const openHash = await openPosition(amountBn);
      await publicClient?.waitForTransactionReceipt({ hash: openHash });

      toast.success("Position opened successfully!", { id: "open" });
    } catch (err: any) {
      toast.error(err?.shortMessage || err?.message || "Transaction failed");
    }
  };

  return (
    <div className="flex-1 w-full max-w-md bg-white rounded-md p-5 border border-gray-300">
      <h2 className="text-lg font-semibold mb-4">Open Long 2x Position</h2>

      {/* Amount input */}
      <div className="mb-4">
        <label className="text-sm text-gray-500 mb-1 block">
          Available to Trade
        </label>
        <input
          type="number"
          value={amount}
          max={maxAmount}
          min={0}
          onChange={(e) => setAmount(Number(e.target.value))}
          disabled={!isConnected}
          className="w-full border rounded-lg px-3 py-2 text-sm disabled:bg-gray-100"
        />
        <p className="text-xs text-gray-400 mt-1">
          Balance: {maxAmount.toLocaleString()} USDC
        </p>
      </div>

      <div className="mb-5">
        <input
          type="range"
          min={0}
          max={maxAmount}
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
        <>
          <button
            disabled={!canSubmit}
            onClick={handleOpenPosition}
            className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
          >
            {isPending ? "Opening position..." : "Open 2x position"}
          </button>

          {insufficientLiquidity && (
            <p className="text-sm text-red-500 mt-2">
              Not enough liquidity for this size
            </p>
          )}
        </>
      )}

      <div className="my-5 border-t" />

      {/* Summary */}
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
        <Row
          label="Profit split"
          value={`${traderShare}% trader / ${poolShare}% pool`}
        />
        <Row label="Auto-close" value="1 year" />
        <Row
          label="Available pool liquidity"
          value={`$${availableLiquidity.toLocaleString()}`}
        />
      </div>
    </div>
  );
}

export default OpenSwapWidget;
