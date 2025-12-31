"use client";

import { useLpBalance } from "@/hooks/useLpBalance";
import { usePreviewWithdraw } from "@/hooks/usePreviewWithdraw";
import { useTotalDebt } from "@/hooks/useTotalDebt";
import { useWithdrawPool } from "@/hooks/useWithdrawPool";
import { useActivityPoolSyncStore } from "@/stores/useActivityPoolSyncStore";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { formatUnits, parseUnits } from "viem";
import { useAccount, usePublicClient } from "wagmi";

export default function WithdrawPanel() {
  const [amount, setAmount] = useState("");
  const { totalDebt } = useTotalDebt();
  const { isConnected } = useAccount();
  const { assetValue: userBalanceLp } = useLpBalance();
  const { shares } = usePreviewWithdraw(Number(amount));
  const publicClient = usePublicClient();
  const { withdraw, isPending } = useWithdrawPool();
  const bumpPositions = useActivityPoolSyncStore((s) => s.bump);

  const amountNum = useMemo(() => {
    const normalized = amount.replace(",", ".");
    const num = Number(normalized);
    return Number.isFinite(num) ? Math.max(num, 0) : 0;
  }, [amount]);

  const handleSliderChange = (value: number) => {
    if (Number.isNaN(value)) return;
    setAmount(value.toString());
  };

  const handleInputChange = (value: string) => {
    const sanitized = value.replace(",", ".");
    if (/^\d*\.?\d*$/.test(sanitized)) {
      setAmount(sanitized);
    }
  };

  const handleWithdraw = async () => {
    try {
      const withdrawAmountBn = parseUnits(amountNum.toString(), 6);
      if (!amountNum || withdrawAmountBn === 0n) return;

      const hash = await withdraw(withdrawAmountBn);
      await publicClient?.waitForTransactionReceipt({ hash });

      toast.success("Withdrawal successful");
      setAmount("");

      setTimeout(() => {
        bumpPositions();
      }, 1500);
    } catch {
      toast.error("Withdrawal failed");
    }
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium">Amount (USDC)</label>

      <input
        value={amount}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="0"
        inputMode="decimal"
        className="text-lg w-full min-h-10 border border-gray-300 p-3 mt-2 rounded-xl"
      />

      <input
        type="range"
        min={0}
        max={Number(userBalanceLp)}
        value={amountNum}
        disabled={!isConnected}
        onChange={(e) => handleSliderChange(Number(e.target.value))}
        className="w-full accent-blue-900"
      />

      <p className="text-xs text-gray-600 mb-3">
        ${Number(userBalanceLp).toFixed(2)} deposited in pool
      </p>

      <div className="bg-gray-50 p-4 rounded-lg text-xs space-y-2">
        <div className="flex justify-between">
          <span>LP tokens to burn</span>
          <span>
            {Number(formatUnits(BigInt(Number(shares)), 6)).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Available pool liquidity</span>
          <span>{`$${(Number(totalDebt) / 1_000_000).toFixed(2)}`}</span>
        </div>
        <p className="text-gray-500 text-xs">
          Withdrawals depend on available pool liquidity.
        </p>
      </div>

      <button
        onClick={handleWithdraw}
        disabled={!amountNum || !isConnected || isPending}
        className="w-full bg-blue-900 text-white min-h-8 rounded-md p-2 font-semibold disabled:bg-gray-400"
      >
        {isPending
          ? "Withdrawing..."
          : amountNum
          ? "Withdraw from pool"
          : "Enter amount to withdraw"}
      </button>
    </div>
  );
}
