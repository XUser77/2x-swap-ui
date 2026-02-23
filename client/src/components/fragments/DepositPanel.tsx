"use client";

import { useUsdcBalance } from "@/hooks/useUsdcBalance";
import { useState, useMemo } from "react";
import SmallRow from "./SmallRow";
import { useAccount, useChainId, usePublicClient } from "wagmi";
import { useLpPrice } from "@/hooks/useLpPrice";
import { useDepositPool } from "@/hooks/useDepositPool";
import { parseUnits } from "viem";
import toast from "react-hot-toast";
import { useActivityPoolSyncStore } from "@/stores/useActivityPoolSyncStore";
import { useApproveUsdc } from "@/hooks/useApproveUsdc";
import { X2_POOL_ADDRESS } from "@/config/contracts";
import { usePool } from "@/contexts/PoolContext";
import { usePoolUsdcAllowance } from "@/hooks/usePoolUsdcAllowance";
import { extractRevertReason } from "@/lib/errorHandling";

export default function DepositPanel() {
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { balance: usdcBalance, decimals } = useUsdcBalance();
  const { isConnected } = useAccount();
  const { lpPrice } = useLpPrice();
  const publicClient = usePublicClient();
  const { deposit, isPending } = useDepositPool();
  const bumpPositions = useActivityPoolSyncStore((s) => s.bump);
  const { allowance, refetch } = usePoolUsdcAllowance();
  const { approve, isPending: approveLoading } = useApproveUsdc();
  const chainId = useChainId();
  const { apy } = usePool();

  // SAFE NUMBER PARSING
  const amountNum = useMemo(() => {
    const normalized = amount.replace(",", ".");
    const num = Number(normalized);
    return Number.isFinite(num) ? Math.max(num, 0) : 0;
  }, [amount]);

  const depositAmountBn = parseUnits(amountNum.toString(), decimals);

  const handleSliderChange = (value: number) => {
    if (Number.isNaN(value)) return;
    setAmount(value.toString());
  };

  const userBalanceUsdc = Number(usdcBalance / 10n ** BigInt(decimals));

  const handleInputChange = (value: string) => {
    const sanitized = value.replace(",", ".");
    if (/^\d*\.?\d*$/.test(sanitized)) {
      setAmount(sanitized);
    }
  };

  const handleDeposit = async () => {
    try {
      if (!amountNum || depositAmountBn === 0n) return;

      setIsProcessing(true);

      if ((allowance ?? 0n) < depositAmountBn) {
        const approveHash = await approve(
          X2_POOL_ADDRESS[chainId],
          depositAmountBn,
        );
        await publicClient?.waitForTransactionReceipt({
          hash: approveHash,
        });
        await refetch();
      }

      const hash = await deposit(depositAmountBn);
      await publicClient?.waitForTransactionReceipt({ hash });

      toast.success("Deposit successful");
      setAmount("");
      setTimeout(() => {
        bumpPositions();
      }, 1500);
    } catch (err: any) {
      const reason = extractRevertReason(err);

      toast.error(reason);
    } finally {
      setIsProcessing(false);
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
        disabled={!isConnected}
      />

      <input
        type="range"
        min={0}
        max={userBalanceUsdc}
        value={amountNum}
        disabled={!isConnected}
        onChange={(e) => handleSliderChange(Number(e.target.value))}
        className="w-full accent-blue-900"
      />

      <p className="text-xs text-gray-600 mb-3">
        ${userBalanceUsdc.toLocaleString()} available in your wallet
      </p>

      <div className="space-y-1 bg-gray-50 p-4 rounded-lg text-sm">
        <p className="text-xs text-gray-500">Estimated annual return</p>
        <p className="text-lg ">{`$${(
          amountNum +
          amountNum * (apy / 100)
        ).toFixed(2)}`}</p>
        <p className="text-xs text-gray-500">Based on current {apy}% APY</p>
      </div>

      <button
        onClick={handleDeposit}
        disabled={
          !amountNum ||
          !isConnected ||
          isPending ||
          isProcessing ||
          approveLoading
        }
        className="w-full bg-blue-900 text-white min-h-8 rounded-md p-2 font-semibold disabled:bg-gray-400"
      >
        {isProcessing || isPending || approveLoading
          ? (allowance ?? 0n) < depositAmountBn
            ? "Approving..."
            : "Depositing..."
          : amountNum
            ? "Deposit to pool"
            : "Enter amount to deposit"}
      </button>

      <div className="text-xs space-y-1">
        <SmallRow label="Revenue Source" value="Profit share" />
        <SmallRow label="Lock Period" value="None" />
        <SmallRow
          label="LP token price"
          value={`$${Number(lpPrice).toFixed(4)}`}
        />
      </div>
    </div>
  );
}
