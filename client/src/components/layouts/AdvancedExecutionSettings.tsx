import { InfoTooltip } from "../ui/infoTooltip";

type Props = {
  slippageAuto: boolean;
  setSlippageAuto: React.Dispatch<React.SetStateAction<boolean>>;
  maxSlippage: number;
  setMaxSlippage: (v: number) => void;
  deadlineMinutes: number;
  setDeadlineMinutes: (v: number) => void;
};

export function AdvancedExecutionSettings({
  slippageAuto,
  setSlippageAuto,
  maxSlippage,
  setMaxSlippage,
  deadlineMinutes,
  setDeadlineMinutes,
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
        />
      </div>

      <div className="flex justify-between">
        <p className="text-xs">
          Trade route{" "}
          <InfoTooltip content="A route is identified considering v2, v3, and certain v4 pools, factoring in estimated price impact and network costs." />
        </p>
        <p className="text-xs">Uniswap V2</p>
      </div>
    </div>
  );
}
