import { cn } from "@/lib/utils";
import type { League } from "../layouts/LeaguesTab";

type LeagueCardProps = {
  league: League;
  isActive: boolean;
};

export function LeagueCard({ league, isActive }: LeagueCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 relative transition-all hover:shadow-lg",
        league.bgColor,
        isActive && "border-2 border-blue-500"
      )}
    >
      {/* Badge */}
      {isActive && (
        <div className="absolute top-4 right-4">
          <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
            Your league
          </span>
        </div>
      )}

      {/* Icon */}
      <div className="mb-4">
        <div
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center",
            league.iconBg,
            league.glowEffect && "shadow-[0_0_20px_rgba(234,179,8,0.5)]"
          )}
        >
          <span className={cn("text-2xl font-bold", league.iconText)}>
            {league.icon}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className={cn("text-xl font-bold mb-2", league.textColor)}>
        {league.name}
      </h3>

      {/* Description */}
      <p
        className={cn(
          "text-sm",
          league.textColor === "text-white" ? "text-gray-200" : "text-gray-600"
        )}
      >
        {league.description}
      </p>
    </div>
  );
}
