import { getRankBgColor, getRankKanji } from "@/lib/rankKanji";
import { InfoTooltip } from "../ui/infoTooltip";
import { useSeasonStatus } from "@/hooks/useSeasonStatus";

export default function UserSeasonStatus() {
  const { data, isLoading, isError } = useSeasonStatus(true);

  if (isLoading) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        Loading your season status…
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="py-10 text-center text-red-500">
        Failed to load season data
      </div>
    );
  }

  const { season, points, rank } = data;

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left section */}
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-4">
          <div
            className={`h-20 w-20 rounded-full flex items-center justify-center text-xl font-bold ${getRankBgColor(
              rank.name === "Academy Student" ? "Student" : rank.name
            )}`}
          >
            {`${getRankKanji(
              rank.name === "Academy Student" ? "Student" : rank.name
            )}`}
          </div>

          <div>
            <p className="text-2xl font-medium">{rank.name}</p>
            <p className="text-sm text-muted-foreground">
              {rank.position
                ? `Rank #${
                    rank.position
                  } · ${points.seasonPoints.toLocaleString()} pts`
                : "Unranked"}
            </p>
          </div>
        </div>

        <div className="mb-1 text-sm font-medium">Progress to next rank</div>

        <div className="flex items-center gap-3">
          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-green-500 rounded-full"
              style={{ width: `${rank.progressPercent ?? 0}%` }}
            />
          </div>
          <span className="text-sm text-muted-foreground">
            {Math.round(rank.progressPercent ?? 0)}%
          </span>
        </div>

        <p className="mt-1 text-xs text-muted-foreground">
          Based on current leaderboard{" "}
          <InfoTooltip content="Ranks are percentile-based and update dynamically." />
        </p>
      </div>

      {/* Right section */}
      <div className="w-full lg:w-72 space-y-3">
        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-sm">
          <span className="text-muted-foreground">Season</span>
          <span className="font-medium">{season.name}</span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-sm">
          <span className="text-muted-foreground">Ends in</span>
          <span className="font-medium">{season.endsInDays} days</span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-sm">
          <span className="text-muted-foreground">All-time points</span>
          <span className="font-medium">
            {points.allTimePoints.toLocaleString()} pts
          </span>
        </div>
      </div>
    </div>
  );
}
