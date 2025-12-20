import { useEffect, useRef, useState } from "react";
import { usePrice, type SymbolKey } from "../../hooks/usePrice";
import type { SymbolOption } from "../../types/symbol";

function SwapBar({
  SYMBOLS,
  symbol,
  setSymbol,
}: {
  SYMBOLS: SymbolOption[];
  symbol: SymbolOption;
  setSymbol: (symbol: SymbolOption) => void;
}) {
  const { data, isLoading } = usePrice(symbol.key as SymbolKey);
  const [open, setOpen] = useState(false);

  const prevPriceRef = useRef<number | null>(null);
  const [priceClass, setPriceClass] = useState("");

  const price =
    typeof data?.price === "number" && Number.isFinite(data?.price)
      ? data?.price
      : null;
  const change24h = data?.change24h;

  useEffect(() => {
    if (price == null) return;

    if (prevPriceRef.current !== null) {
      if (price > prevPriceRef.current) {
        setPriceClass("price-up");
      } else if (price < prevPriceRef.current) {
        setPriceClass("price-down");
      }

      // Remove class after animation
      const timeout = setTimeout(() => setPriceClass(""), 600);
      return () => clearTimeout(timeout);
    }

    prevPriceRef.current = price;
  }, [price]);

  return (
    <div className="flex pt-3 items-center gap-10 px-4 py-2 border-b border-white/10">
      {/* Symbol Selector */}
      <div className="relative flex items-center gap-2">
        <div>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md  hover:bg-black/10 text-sm font-medium"
          >
            {symbol.label}
            <span className="text-xs opacity-60">▼</span>
          </button>

          {open && (
            <div className="absolute mt-2 w-40 rounded-md bg-white shadow-lg border border-black/10 z-10">
              {SYMBOLS.map((s) => (
                <button
                  key={s.tvSymbol}
                  onClick={() => {
                    setSymbol(s);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-black/5 ${
                    symbol.tvSymbol === s.tvSymbol
                      ? "font-semibold"
                      : "font-normal"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-200 px-3 rounded-sm">2x</div>
      </div>

      <div className="flex justify-center items-center gap-4">
        {/* Price */}
        <div className={`font-semibold ${priceClass}`}>
          Market:{" "}
          {isLoading || price === undefined ? "--" : `$${price?.toFixed(2)}`}
        </div>
        {/* Oracle */}
        <div className="font-semibold">Oracle: $88,000</div>

        {/* 24h Change */}
        <div className={`font-semibold`}>
          24h Change:{" "}
          {change24h !== undefined ? (
            <span
              className={`${
                change24h >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {change24h.toFixed(2)}%
            </span>
          ) : (
            <span>--</span>
          )}
        </div>

        {/* OI */}
        <div className="font-semibold">OI: $200,000</div>
      </div>
    </div>
  );
}

export default SwapBar;
