"use client";

import { useState, useMemo } from "react";
import { useAccount, useChainId, usePublicClient } from "wagmi";
import { Settings, ChevronDown } from "lucide-react";
import Row from "../fragments/Row";
import { useUsdcBalance } from "@/hooks/useUsdcBalance";
import { useProfitSplit } from "@/hooks/useProfitSplit";
import { useOpenPosition } from "@/hooks/useOpenPosition";
import { useApproveUsdc } from "@/hooks/useApproveUsdc";
import { useUsdcAllowance } from "@/hooks/useUsdcAllowance";
import { usePrice } from "@/hooks/usePrice";
import { usePoolLiquidity } from "@/hooks/usePoolLiquidity";
import { useFeeBps } from "@/hooks/useFeeBps";
import { buildPath, USDC } from "@/lib/buildPath";
import { parseUnits } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import { X2_SWAP_ADDRESS } from "@/config/contracts";
import { useWETHExchangeTokens } from "@/hooks/useWETHExchangeToken";
import { usePositionsSyncStore } from "@/stores/usePositionSyncStore";
import { AdvancedExecutionSettings } from "./AdvancedExecutionSettings";

type Props = {
  asset: "WBTC" | "WETH" | "PAXG";
};

export default function OpenSwapWidget({ asset }: Props) {
  const { isConnected } = useAccount();
  const publicClient = usePublicClient();
  const chainId = useChainId();

  // STRING STATE
  const [assetAmount, setAssetAmount] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showTxDetails, setShowTxDetails] = useState(false);
  const [slippageAuto, setSlippageAuto] = useState(true);
  const leverage = 2;

  const [maxSlippage, setMaxSlippage] = useState(2);
  const [deadlineMinutes, setDeadlineMinutes] = useState(30);

  const { feeBps } = useFeeBps();
  const { balance: usdcBalance, decimals } = useUsdcBalance();
  const { liquidity } = usePoolLiquidity();
  const { poolShare, traderShare } = useProfitSplit();
  const { allowance, refetch } = useUsdcAllowance();
  const { price } = usePrice(asset).data ?? { price: 0 };
  const bumpPositions = usePositionsSyncStore((s) => s.bump);

  // TODO:
  const { token0: TOKEN0WETH, token1: TOKEN1WETH } = useWETHExchangeTokens();

  const { openPosition, isPending } = useOpenPosition();
  const { approve } = useApproveUsdc();

  // SAFE NUMBER PARSING
  const assetAmountNum = useMemo(() => {
    const normalized = assetAmount.replace(",", ".");
    const num = Number(normalized);
    return Number.isFinite(num) ? Math.max(num, 0) : 0;
  }, [assetAmount]);

  const userBalanceUsdc = Number(usdcBalance / 10n ** BigInt(decimals));
  const poolLiquidityUsdc = Number(liquidity / 10n ** BigInt(decimals));

  const maxLeveragedByUser = userBalanceUsdc * leverage;
  const maxLeveragedByPool = poolLiquidityUsdc * leverage * 0.99;
  const maxLeveragedAllowed = Math.min(maxLeveragedByUser, maxLeveragedByPool);

  const leveragedUsdc = price > 0 ? assetAmountNum * price : 0;
  const clampedLeveragedUsdc = Math.min(leveragedUsdc, maxLeveragedAllowed);
  const userUsdc = clampedLeveragedUsdc / leverage;
  const userUsdcBn = parseUnits(userUsdc, decimals);
  const feeFactor = 1 - Number(feeBps) / 10_000;
  const slippageFactor = 1 - maxSlippage / 100;

  const minReceived =
    price > 0 ? (clampedLeveragedUsdc * feeFactor * slippageFactor) / price : 0;

  const handleAssetChange = (value: string) => {
    const sanitized = value.replace(",", ".");
    if (/^\d*\.?\d*$/.test(sanitized)) {
      setAssetAmount(sanitized);
    }
  };

  const handleSliderChange = (value: number) => {
    if (price === 0) return;
    setAssetAmount((value / price).toString());
  };

  const handleOpen = async () => {
    try {
      if (assetAmountNum <= 0) {
        toast.error("Enter an amount");
        return;
      }
      if (clampedLeveragedUsdc > maxLeveragedAllowed) {
        toast.error("Amount exceeds available liquidity");
        return;
      }

      const spender = X2_SWAP_ADDRESS[chainId];
      let path;

      if (asset === "WETH") {
        if (!TOKEN0WETH || !TOKEN1WETH) return;
        path = buildPath(
          USDC,
          TOKEN0WETH as `0x${string}`,
          TOKEN1WETH as `0x${string}`
        );
      }

      const deadline = Math.floor(Date.now() / 1000) + deadlineMinutes * 60;
      const maxDeviationBps = Math.floor(maxSlippage * 100);

      if (allowance < userUsdcBn) {
        const hash = await approve(spender, userUsdcBn);
        await publicClient?.waitForTransactionReceipt({ hash });
        await refetch();
      }

      const tx = await openPosition(
        userUsdcBn,
        maxDeviationBps,
        path!,
        deadline
      );

      await publicClient?.waitForTransactionReceipt({ hash: tx });
      toast.success("Position opened");
      setAssetAmount("");
      setTimeout(() => bumpPositions(), 1500);
    } catch {
      toast.error("Open Position Failed");
    }
  };

  return (
    <div className="w-full flex-1 max-w-md bg-white rounded-xl p-5 border">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">Open Long 2x Position</h2>
        <Settings
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-5 h-5 cursor-pointer text-gray-500"
        />
      </div>

      {showAdvanced && (
        <AdvancedExecutionSettings
          slippageAuto={slippageAuto}
          setSlippageAuto={setSlippageAuto}
          maxSlippage={maxSlippage}
          setMaxSlippage={setMaxSlippage}
          deadlineMinutes={deadlineMinutes}
          setDeadlineMinutes={setDeadlineMinutes}
        />
      )}

      {/* INPUT */}
      <label className="text-md text-gray-500 font-semibold">You buy</label>
      <div className="border rounded-md px-3 py-4 mt-1">
        <div className="flex w-full justify-between">
          <input
            type="text"
            inputMode="decimal"
            value={assetAmount}
            onChange={(e) => handleAssetChange(e.target.value)}
            className="w-[75%] px-2 text-xl"
            disabled={!isConnected}
            placeholder="0"
          />
          <p className="bg-gray-200 py-1 px-2 rounded-md text-sm font-semibold">
            {asset}
          </p>
        </div>

        <p className="text-sm text-gray-500 pl-2">
          ≈ ${clampedLeveragedUsdc.toFixed(2)} USDC
        </p>
      </div>

      <input
        type="range"
        min={0}
        max={maxLeveragedAllowed}
        value={clampedLeveragedUsdc}
        disabled={!isConnected || isPending}
        onChange={(e) => handleSliderChange(Number(e.target.value))}
        className="w-full my-3 accent-blue-900"
      />

      <p className="text-xs text-gray-400 mb-1">
        Your balance: {userBalanceUsdc.toLocaleString()} USDC
      </p>

      <div className="p-3 bg-gray-50 rounded-lg text-sm mb-4">
        <p className="text-gray-700 mb-1">Minimum you will get</p>
        <p className="font-medium text-gray-900">
          {minReceived.toFixed(6)} {asset}
        </p>
        <p className="text-gray-700 mt-1">After fees and execution</p>
      </div>

      <button
        onClick={handleOpen}
        disabled={!isConnected || isPending || !assetAmount}
        className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold disabled:bg-gray-400"
      >
        {isPending
          ? "Opening..."
          : assetAmount
          ? "Open 2x position"
          : "Enter amount to open"}
      </button>

      <div className="mt-5 space-y-2 text-sm">
        <Row label="Leverage" value="2x" />
        <Row label="Your capital" value={`$${userUsdc.toFixed(2)}`} />
        <Row
          label="Total position size"
          value={`$${clampedLeveragedUsdc.toFixed(2)}`}
        />
        <Row label="Profit split" value={`${traderShare}% / ${poolShare}%`} />
        <Row label="Auto-close after" value="1 year" />
        <Row label="Available Pool Liquidity" value={`$${poolLiquidityUsdc}`} />
      </div>

      <div className="mt-4 border-t pt-3 hidden md:block">
        <button
          onClick={() => setShowTxDetails(!showTxDetails)}
          className="w-full flex justify-between text-sm font-medium"
        >
          <span>Transaction details</span>
          <ChevronDown
            className={`w-4 h-4 ${showTxDetails ? "rotate-180" : ""}`}
          />
        </button>

        {showTxDetails && (
          <div className="mt-3 space-y-2 text-sm text-gray-600">
            <Row label="Oracle price" value={`$${price}`} />
            <Row label="Swap execution" value="Uniswap" />
            <Row label="Protocol fee" value={`${Number(feeBps) / 100}%`} />
          </div>
        )}
      </div>
    </div>
  );
}
