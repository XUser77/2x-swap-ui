import { ArrowRight, ArrowLeft, ArrowDown, ArrowUp } from "lucide-react";

export function HorizontalLine({
  active,
  flowKey,
  setHoveredFlow,
  className = "",
  arrow = "right",
  length = 160,
}: {
  active: boolean;
  flowKey: string;
  setHoveredFlow: (v: string | null) => void;
  className?: string;
  arrow?: "left" | "right";
  length?: number;
}) {
  const ArrowIcon = arrow === "right" ? ArrowRight : ArrowLeft;
  const arrowCount = Math.max(1, Math.floor(length / 100));

  return (
    <div
      onMouseEnter={() => setHoveredFlow(flowKey)}
      onMouseLeave={() => setHoveredFlow(null)}
      className={`absolute cursor-pointer overflow-hidden ${className}`}
      style={{
        height: "25px",
        width: `${length}px`,
        borderRadius: "999px",
      }}
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#7DA8FF]" />

      {/* Animated fill */}
      <div
        className="absolute inset-0 bg-white transition-transform duration-500 ease-out"
        style={{
          transform: active ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: arrow === "right" ? "left" : "right",
        }}
      />

      {/* Arrows */}
      <div className="relative z-10 h-full flex items-center justify-center gap-10">
        {Array.from({ length: arrowCount }).map((_, i) => (
          <ArrowIcon
            key={i}
            size={23}
            className={`transition-colors duration-300 ${
              active ? "text-[#7DA8FF]" : "text-white"
            } opacity-80`}
          />
        ))}
      </div>
    </div>
  );
}

export function VerticalLine({
  active,
  flowKey,
  setHoveredFlow,
  className = "",
  arrow = "down",
  length = 120,
}: {
  active: boolean;
  flowKey: string;
  setHoveredFlow: (v: string | null) => void;
  className?: string;
  arrow?: "up" | "down" | "both";
  length?: number;
}) {
  const arrowCount = Math.max(1, Math.floor(length / 120));

  return (
    <div
      onMouseEnter={() => setHoveredFlow(flowKey)}
      onMouseLeave={() => setHoveredFlow(null)}
      className={`absolute cursor-pointer overflow-hidden ${className}`}
      style={{
        width: "25px",
        height: `${length}px`,
        borderRadius: "999px",
      }}
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#7DA8FF]" />

      {/* Animated fill */}
      <div
        className="absolute inset-0 bg-white transition-transform duration-500 ease-out"
        style={{
          transform: active ? "scaleY(1)" : "scaleY(0)",
          transformOrigin:
            arrow === "both" ? "center" : arrow === "down" ? "top" : "bottom",
        }}
      />

      {/* Arrows */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-10">
        {Array.from({ length: arrowCount }).map((_, i) =>
          arrow === "both" ? (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-1"
            >
              <ArrowUp
                size={18}
                className={`transition-colors duration-300 ${
                  active ? "text-[#7DA8FF]" : "text-white"
                } opacity-80`}
              />
              <ArrowDown
                size={18}
                className={`absolute top-[60px] transition-colors duration-300 ${
                  active ? "text-[#7DA8FF]" : "text-white"
                } opacity-80`}
              />
            </div>
          ) : arrow === "down" ? (
            <ArrowDown
              key={i}
              size={23}
              className={`transition-colors duration-300 ${
                active ? "text-[#7DA8FF]" : "text-white"
              } opacity-80`}
            />
          ) : (
            <ArrowUp
              key={i}
              size={23}
              className={`transition-colors duration-300 ${
                active ? "text-[#7DA8FF]" : "text-white"
              } opacity-80`}
            />
          )
        )}
      </div>
    </div>
  );
}
