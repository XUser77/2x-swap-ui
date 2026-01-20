type ReferralActivity = {
  wallet: string;
  dateJoined: string;
  activityType: string;
  totalVolume: number;
  pointsAttributed: number;
};

export function ReferralActivityCard({
  activity,
}: {
  activity: ReferralActivity;
}) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 space-y-2 bg-gray-50">
      {/* Wallet + badge */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm text-gray-900">
          {`${activity.wallet.slice(0, 6)}…${activity.wallet.slice(-4)}`}
        </span>

        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            activity.activityType === "Trading"
              ? "bg-pink-100 text-pink-700"
              : "bg-purple-100 text-purple-700"
          }`}
        >
          {activity.activityType}
        </span>
      </div>

      {/* Meta */}
      <div className="text-xs text-gray-500">
        Joined {new Date(activity.dateJoined).toLocaleDateString()}
      </div>

      {/* Volume + points */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-sm text-gray-700">
          Volume:{" "}
          <span className="font-medium text-gray-900">
            ${activity.totalVolume.toLocaleString()}
          </span>
        </div>

        <div className="text-sm font-semibold text-gray-900">
          {activity.pointsAttributed.toLocaleString()} pts
        </div>
      </div>
    </div>
  );
}
