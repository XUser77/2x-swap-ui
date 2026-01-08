import { TrendingDown, TrendingUp, TriangleAlert } from "lucide-react";

type OutcomeCardProps = {
  title: string;
  subtitle: string;
  color: "green" | "red" | "yellow";
  bullets: string[];
  footer?: string;
  active?: boolean;
};

const colorMap = {
  green: "bg-green-500",
  red: "bg-red-500",
  yellow: "bg-yellow-400",
};

export default function OutcomeCard({
  title,
  subtitle,
  color,
  bullets,
  footer,
  active = false,
}: OutcomeCardProps) {
  return (
    <div
      className={`
        w-20 md:w-105 rounded-2xl bg-white text-left
        p-5 md:p-6 transition-all duration-500
        ${
          active ? "shadow-[0_30px_80px_rgba(30,95,216,0.35)]" : "shadow-md"
        } md:min-w-lg min-w-[280px] min-h-67
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${colorMap[color]}`}
        >
          {/* Placeholder icon */}
          <span className="text-white font-bold">
            {color === "green" && <TrendingUp />}
            {color === "yellow" && <TrendingDown />}
            {color === "red" && <TriangleAlert />}
          </span>
        </div>

        <div>
          <h3 className="font-bold text-lg md:text-2xl text-gray-900">
            {title}
          </h3>
          <p className="text-xs md:text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>

      <div className="h-px bg-gray-400 my-2" />

      {/* Outcome */}
      <p className="font-bold text-md md:text-lg mb-2 text-gray-900">Outcome</p>
      <ul className="list-disc list-inside text-xs md:text-sm text-gray-900 px-3">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      {footer && (
        <p className="mt-4 text-xs text-black leading-relaxed">{footer}</p>
      )}
    </div>
  );
}
