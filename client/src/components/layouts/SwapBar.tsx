import { useEffect, useRef, useState } from "react";
import { usePrice, type SymbolKey } from "../../hooks/usePrice";
import type { SymbolOption } from "../../types/symbol";
import { useTotalDebt } from "@/hooks/useTotalDebt";

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
  const { totalDebt } = useTotalDebt();
  const [open, setOpen] = useState(false);

  const prevPriceRef = useRef<number | null>(null);
  const [priceClass, setPriceClass] = useState("");

  const price =
    typeof data?.price === "number" && Number.isFinite(data?.price)
      ? data?.price
      : null;
  const change24h = data?.change24h;
  const change24hPoint = data?.change24hPoint;

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
    <div className="flex items-center justify-between gap-10 px-6 py-3 bg-[#DDE9F9] border-b border-[#D1D4DA]">
      {" "}
      {/* Symbol Selector */}
      <div className="relative flex items-center gap-2">
        <div>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#D1D4DA] hover:bg-[#F9FBFD] text-sm font-semibold text-[#202020]"
          >
            {symbol.label}
            <span className="text-xs opacity-60">▼</span>
          </button>

          {open && (
            <div className="absolute mt-1 w-44 rounded-xl bg-white border border-[#D1D4DA] shadow-md z-20">
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

        <div className="px-3 py-1 rounded-lg bg-[#022368] text-white text-xs font-semibold">
          2x
        </div>
      </div>
      <div className=" flex justify-center items-center gap-4">
        {/* Price */}
        <div className={`font-medium text-[#202020] ${priceClass} text-xs `}>
          <span className="opacity-50">Oracle: </span>
          {isLoading || price === undefined ? "--" : `$${price?.toFixed(2)}`}
        </div>

        {/* 24h Change */}
        <div className="hidden md:block font-semibold text-xs">
          <span className="opacity-50">24h Change: </span>
          {change24hPoint !== undefined ? (
            <span
              className={`${
                change24hPoint >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {change24hPoint.toFixed(2)} /{" "}
            </span>
          ) : (
            <span>-- / </span>
          )}
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
        <div className="hidden md:block font-semibold text-xs">
          <span className="opacity-50">OI: </span>$
          {((Number(totalDebt) * 2) / 1_000_000).toFixed(2)}
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default SwapBar;
