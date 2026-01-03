import { generateTVLData, type Timeframe } from "@/lib/tvlCalculation";
import { useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  type TooltipContentProps,
  Area,
  AreaChart,
  CartesianGrid,
} from "recharts";

function CustomTooltip({
  active,
  payload,
}: TooltipContentProps<number, string>) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const value = payload[0].value ?? 0;

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-md p-3 text-sm">
      <div className="text-gray-600 font-medium mb-1">TVL</div>
      <div className="text-blue-900 font-semibold text-lg">
        {new Intl.NumberFormat("en", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(value as number)}
      </div>
    </div>
  );
}

export function TVLChart() {
  const [tf, setTf] = useState<Timeframe>("M");

  const data = generateTVLData(tf);

  return (
    <div className="bg-white rounded-xl p-5 flex-3">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Total Value Locked (TVL)</h3>
        <div className="flex gap-2">
          {(["D", "W", "M", "Y"] as Timeframe[]).map((t) => (
            <button
              key={t}
              onClick={() => setTf(t)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                tf === t ? "bg-blue-900 text-white" : "text-gray-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />

          <YAxis
            tickFormatter={(val) =>
              new Intl.NumberFormat("en", { notation: "compact" }).format(val)
            }
            label={{
              value: "TVL (USD)",
              angle: -90,
              position: "insideLeft",
            }}
            tick={{ fontSize: 12 }}
          />

          {/* @ts-ignore */}
          <Tooltip content={<CustomTooltip />} />

          <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#122C34"
            fill="#2A4494"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
