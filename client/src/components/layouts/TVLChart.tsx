import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Timeframe = "D" | "W" | "M" | "Y";

type TVLPoint = {
  label: string;
  value: number;
};

const formatters: Record<Timeframe, (d: Date) => string> = {
  D: (d) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  W: (d) => d.toLocaleDateString([], { weekday: "short" }),
  M: (d) => d.toLocaleDateString([], { day: "2-digit", month: "short" }),
  Y: (d) => d.toLocaleDateString([], { month: "short" }),
};

function generateTVLData(tf: Timeframe): TVLPoint[] {
  const now = new Date();
  const data: TVLPoint[] = [];

  let points = 0;
  let cursor: Date;
  let step: (d: Date) => void;

  switch (tf) {
    case "D":
      points = 6;

      // ⬇️ Start at 00:00 today
      cursor = new Date(now);
      cursor.setHours(0, 0, 0, 0);

      step = (d) => d.setHours(d.getHours() + 4);
      break;

    case "W":
      points = 7;
      cursor = new Date(now);
      step = (d) => d.setDate(d.getDate() - 1);
      break;

    case "M":
      points = 6;
      cursor = new Date(now);
      step = (d) => d.setDate(d.getDate() - 5);
      break;

    case "Y":
      points = 6;
      cursor = new Date(now);
      step = (d) => d.setMonth(d.getMonth() - 2);
      break;
  }

  for (let i = 0; i < points; i++) {
    data.push({
      label: formatters[tf](cursor),
      value: 1_000_000 + i * 150_000 + Math.random() * 50_000,
    });

    step(cursor);
  }

  return data;
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

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="label" />
          <YAxis hide />
          <Tooltip />
          <Line type="monotone" dataKey="value" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
