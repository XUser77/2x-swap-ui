import { ChevronDown, ChevronUp } from "lucide-react";
import { InfoTooltip } from "../ui/infoTooltip";
type Props = {
  slippageAuto: boolean;
  setSlippageAuto: React.Dispatch<React.SetStateAction<boolean>>;
  maxSlippage: number;
  setMaxSlippage: (v: number) => void;
  deadlineMinutes: number;
  setDeadlineMinutes: (v: number) => void;
  setRoute: (v: "V2" | "V3") => void;
  route: "V2" | "V3";
};
export function AdvancedExecutionSettings({
  slippageAuto,
  setSlippageAuto,
  maxSlippage,
  setMaxSlippage,
  deadlineMinutes,
  setDeadlineMinutes,
  setRoute,
  route,
}: Props) {
  const handleSlippageKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      incrementSlippage();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      decrementSlippage();
    }
  };

  const handleDeadlineKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      incrementDeadline();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      decrementDeadline();
    }
  };

  const incrementSlippage = () => {
    const newValue = Math.min(maxSlippage + 0.1, 5);
    setMaxSlippage(Number(newValue.toFixed(1)));
  };

  const decrementSlippage = () => {
    const newValue = Math.max(maxSlippage - 0.1, 0);
    setMaxSlippage(Number(newValue.toFixed(1)));
  };

  const incrementDeadline = () => {
    setDeadlineMinutes(Math.min(deadlineMinutes + 1, 120));
  };

  const decrementDeadline = () => {
    setDeadlineMinutes(Math.max(deadlineMinutes - 1, 1));
  };

  const handleAutoToggle = () => {
    setSlippageAuto((v) => {
      const newAutoValue = !v;

      if (newAutoValue) {
        setMaxSlippage(2);
      }

      return newAutoValue;
    });
  };

  return (
    <div className="mb-4 p-2 rounded-lg border border-gray-200 bg-gray-50 space-y-3">
      <p className="font-semibold text-xs">Advanced Execution Settings</p>
      <div className="flex justify-between items-center">
        <span className="text-xs">
          Max slippage (%){" "}
          <InfoTooltip content="Maximum price movement you're willing to accept during execution" />
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAutoToggle}
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              slippageAuto
                ? "bg-blue-900 text-white border-blue-900"
                : "bg-white text-gray-500 border-gray-200"
            }`}
          >
            Auto
          </button>
          <div className="relative">
            <input
              type="text"
              inputMode="none"
              value={maxSlippage}
              disabled={slippageAuto}
              onKeyDown={handleSlippageKeyDown}
              onChange={(e) => e.preventDefault()}
              className={`w-20 border border-gray-200 rounded px-2 py-1 pr-7 text-xs ${
                slippageAuto
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white cursor-pointer"
              }`}
              readOnly
            />
            {!slippageAuto && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                <button
                  onClick={incrementSlippage}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  type="button"
                  aria-label="Increase slippage"
                >
                  <ChevronUp size={12} />
                </button>
                <button
                  onClick={decrementSlippage}
                  className="text-gray-400 hover:text-gray-600 transition-colors -mt-1"
                  type="button"
                  aria-label="Decrease slippage"
                >
                  <ChevronDown size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <span className="text-xs">
          Swap deadline (minutes){" "}
          <InfoTooltip content="Transaction will revert if not executed within this time" />
        </span>
        <div className="relative">
          <input
            type="text"
            inputMode="none"
            value={deadlineMinutes}
            onKeyDown={handleDeadlineKeyDown}
            onChange={(e) => e.preventDefault()}
            className="w-20 border border-gray-200 rounded px-2 py-1 pr-7 text-xs bg-white cursor-pointer"
            readOnly
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
            <button
              onClick={incrementDeadline}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              type="button"
              aria-label="Increase deadline"
            >
              <ChevronUp size={12} />
            </button>
            <button
              onClick={decrementDeadline}
              className="text-gray-400 hover:text-gray-600 transition-colors -mt-1"
              type="button"
              aria-label="Decrease deadline"
            >
              <ChevronDown size={12} />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <label className="text-xs text-gray-600 font-medium">Trade Route</label>
        <div className="flex gap-2 mt-1">
          <button
            onClick={() => setRoute("V2")}
            className={`flex-1 py-2 rounded-md border text-xs font-medium ${
              route === "V2"
                ? "bg-blue-900 text-white border-blue-900"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Uniswap V2
          </button>
          <button
            onClick={() => setRoute("V3")}
            className={`flex-1 py-2 rounded-md border text-xs font-medium ${
              route === "V3"
                ? "bg-blue-900 text-white border-blue-900"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Uniswap V3
          </button>
        </div>
      </div>
    </div>
  );
}
