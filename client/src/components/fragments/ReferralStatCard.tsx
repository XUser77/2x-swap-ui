import { Activity, TrendingUp, Users } from "lucide-react";

type ReferralStatCardProps = {
  label: string;
  value: string | number;
};

export function ReferralStatCard({ label, value }: ReferralStatCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 px-6 shadow-md">
      <div className="bg-gray-100 p-3 w-12 flex items-center rounded-full my-2">
        {label === "Referred participants" && (
          <Users className=" text-gray-500" />
        )}
        {label === "Referral points (season)" && (
          <TrendingUp className=" text-gray-500" />
        )}
        {label === "Referral points (all-time)" && (
          <TrendingUp className=" text-gray-500" />
        )}
        {label === "Active referrals (30d)" && (
          <Activity className=" text-gray-500" />
        )}
      </div>
      <p className="text-2xl font-semibold mt-2">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
