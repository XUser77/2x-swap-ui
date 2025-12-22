import TradingViewWidget from "../components/layouts/TradingViewWidget";
import { useState } from "react";
import type { SymbolOption } from "../types/symbol";
import SwapBar from "../components/layouts/SwapBar";
import OpenSwapWidget from "../components/layouts/OpenSwapWidget";
import PositionWidget from "@/components/layouts/PositionWidget";

function Swap() {
  const SYMBOLS: SymbolOption[] = [
    { label: "BTC / USD", tvSymbol: "BTCUSD", key: "BTC" },
    { label: "ETH / USD", tvSymbol: "ETHUSD", key: "ETH" },
    { label: "PAXG / USD", tvSymbol: "PAXGUSD", key: "PAXG" },
  ];

  const [symbol, setSymbol] = useState(SYMBOLS[0]);

  return (
    <div className="bg-gray-100">
      <SwapBar SYMBOLS={SYMBOLS} symbol={symbol} setSymbol={setSymbol} />
      <div className="mx-10 py-3">
        <div className="flex gap-8">
          <TradingViewWidget symbol={symbol} />
          <OpenSwapWidget />
        </div>
        <PositionWidget />
      </div>
    </div>
  );
}
export default Swap;
