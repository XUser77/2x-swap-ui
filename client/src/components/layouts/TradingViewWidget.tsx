"use client";

import { useEffect, useRef, useState } from "react";
import type { SymbolOption } from "../../types/symbol";

const TIMEFRAMES = [
  { label: "1H", value: "60" },
  { label: "4H", value: "240" },
  { label: "1D", value: "D" },
  { label: "1W", value: "W" },
];

export default function TradingViewWidget({
  symbol,
}: {
  symbol: SymbolOption;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const [interval, setInterval] = useState("D");

  useEffect(() => {
    if (!containerRef.current) return;

    // Cleanup previous widget
    containerRef.current.innerHTML = "";
    if (scriptRef.current) {
      scriptRef.current.remove();
      scriptRef.current = null;
    }

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.type = "text/javascript";

    script.innerHTML = JSON.stringify({
      symbol: symbol.tvSymbol,
      interval,
      autosize: true,
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      allow_symbol_change: false,
      hide_top_toolbar: true,
      hide_side_toolbar: true,
      hide_legend: true,
      save_image: false,
      withdateranges: false,
      hide_volume: true,
      backgroundColor: "#ffffff",
      gridColor: "rgba(0, 0, 0, 0.05)",
      studies: [],
    });

    containerRef.current.appendChild(script);
    scriptRef.current = script;
  }, [symbol, interval]);

  return (
    <div className="w-full flex-3 p-4 border border-gray-300 rounded-lg bg-white">
      {/* Timeframe selector */}
      <div className="flex gap-2 mb-3">
        {TIMEFRAMES.map((tf) => (
          <button
            key={tf.value}
            onClick={() => setInterval(tf.value)}
            className={`px-3 py-1 text-sm rounded-md ${
              interval === tf.value
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            {tf.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="tradingview-widget-container">
        <div
          ref={containerRef}
          className="tradingview-widget-container__widget"
          style={{ height: "70vh", width: "100%" }}
        />
      </div>
    </div>
  );
}
