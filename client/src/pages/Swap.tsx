import TradingViewWidget from "../components/layouts/TradingViewWidget";
import { useState } from "react";
import type { SymbolOption } from "../types/symbol";
import SwapBar from "../components/layouts/SwapBar";
import OpenSwapWidget from "../components/layouts/OpenSwapWidget";
import PositionWidget from "@/components/layouts/PositionWidget";

function Swap() {
  const SYMBOLS: SymbolOption[] = [
    { label: "WBTC / USDC", tvSymbol: "WBTCUSDC", key: "WBTC" },
    { label: "WETH / USDC", tvSymbol: "WETHUSDC", key: "WETH" },
    { label: "PAXG / USDC", tvSymbol: "PAXGUSDC", key: "PAXG" },
  ];

  const [symbol, setSymbol] = useState(SYMBOLS[0]);

  return (
    <div className="bg-[#BFD7F8]">
      <SwapBar SYMBOLS={SYMBOLS} symbol={symbol} setSymbol={setSymbol} />
      <div className="max-w-450 mx-auto">
        <div className="mx-10 py-3">
          <div className="flex flex-col md:flex-row gap-5">
            <TradingViewWidget symbol={symbol} />
            <OpenSwapWidget asset={symbol.key as "WBTC" | "WETH" | "PAXG"} />
          </div>
          <PositionWidget />
        </div>
      </div>
    </div>
  );
}
export default Swap;
