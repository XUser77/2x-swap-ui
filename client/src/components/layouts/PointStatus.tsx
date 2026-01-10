import { InfoTooltip } from "../ui/infoTooltip";

function PointStatus() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold mb-6">Your status this season</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left section */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            {/* Avatar */}
            <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
              上忍
            </div>

            {/* Name & rank */}
            <div>
              <p className="text-2xl font-medium">Jonin</p>
              <p className="text-sm text-muted-foreground">
                Rank #312 · 12,450 pts
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-1 text-sm font-medium">Progress to ANBU</div>

          <div className="flex items-center gap-3">
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-green-500 rounded-full"
                style={{ width: "65%" }}
              />
            </div>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              65%
            </span>
          </div>

          <p className="mt-1 text-xs text-muted-foreground">
            4,550 pts to go{" "}
            <InfoTooltip content="League thresholds are dynamic and update throughout the season." />
          </p>
        </div>

        {/* Right section */}
        <div className="w-full lg:w-72 space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-sm">
            <span className="text-muted-foreground">Season</span>
            <span className="font-medium">Season 1</span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-sm">
            <span className="text-muted-foreground">Ends in</span>
            <span className="font-medium">42 days</span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-sm">
            <span className="text-muted-foreground">All-time points</span>
            <span className="font-medium">38,920 pts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PointStatus;
