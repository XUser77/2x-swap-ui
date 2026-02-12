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
            onClick={() => setSlippageAuto((v) => !v)}
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              slippageAuto
                ? "bg-blue-900 text-white border-blue-900"
                : "bg-white text-gray-500 border-gray-200"
            }`}
          >
            Auto
          </button>

          <input
            type="number"
            step="0.1"
            value={maxSlippage}
            disabled={slippageAuto}
            onChange={(e) => setMaxSlippage(Number(e.target.value))}
            max={5}
            min={0}
            className={`w-20 border border-gray-200 rounded px-2 py-1 text-xs ${
              slippageAuto
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white"
            }`}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <span className="text-xs">
          Swap deadline (minutes){" "}
          <InfoTooltip content="Transaction will revert if not executed within this time" />
        </span>

        <input
          type="number"
          value={deadlineMinutes}
          onChange={(e) => setDeadlineMinutes(Number(e.target.value))}
          className="w-20 border border-gray-200 rounded px-2 py-1 text-xs"
          min={0}
        />
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
