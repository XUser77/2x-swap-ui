import { useState } from "react";
import { ReferralModal } from "../fragments/ReferralModal";
import { ReferralStatCard } from "../fragments/ReferralStatCard";

type ReferralActivity = {
  id: string;
  wallet: string;
  dateJoined: string;
  activityType: "Trading" | "Liquidity";
  totalVolume: number;
  pointsAttributed: number;
};

const mockReferralActivities: ReferralActivity[] = [
  {
    id: "1",
    wallet: "0x742d...0bEb",
    dateJoined: "Dec 15, 2024",
    activityType: "Trading",
    totalVolume: 45600,
    pointsAttributed: 892,
  },
  {
    id: "2",
    wallet: "0x8ab7...3cD2",
    dateJoined: "Dec 10, 2024",
    activityType: "Liquidity",
    totalVolume: 128000,
    pointsAttributed: 1245,
  },
  {
    id: "3",
    wallet: "0x5e2b...a6F8",
    dateJoined: "Dec 8, 2024",
    activityType: "Trading",
    totalVolume: 32400,
    pointsAttributed: 534,
  },
  {
    id: "4",
    wallet: "0x9f1c...d6C8",
    dateJoined: "Dec 1, 2024",
    activityType: "Liquidity",
    totalVolume: 89500,
    pointsAttributed: 749,
  },
];

export default function ReferralsTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white p-8 space-y-6 rounded-xl">
      {/* Stats */}
      <div className="space-y-3">
        <h1 className="font-semibold text-xl">Referrals</h1>
        <p className="text-sm text-gray-600">
          Refer participants to earn points.{" "}
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-indigo-600 underline hover:text-indigo-700 cursor-pointer font-medium"
          >
            Learn more
          </button>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ReferralStatCard label="Referred participants" value={12} />
        <ReferralStatCard label="Referral points (season)" value={3420} />
        <ReferralStatCard label="Referral points (all-time)" value={8950} />
        <ReferralStatCard label="Active referrals (30d)" value={8} />
      </div>

      {/* Referral code */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold mb-3">Your referral code</h3>
        <div className="flex gap-3">
          <input
            readOnly
            value="https://2xswap.io/ref/XXXX"
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50"
          />
          <button className="border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition-colors">
            Copy
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Referral points are attributed only while the referred wallet is
          active.
        </p>
      </div>

      {/* Activity table */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold mb-4">Referral activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 font-medium text-gray-600">
                  Wallet
                </th>
                <th className="text-left py-3 font-medium text-gray-600">
                  Date joined
                </th>
                <th className="text-left py-3 font-medium text-gray-600">
                  Activity type
                </th>
                <th className="text-left py-3 font-medium text-gray-600">
                  Total volume
                </th>
                <th className="text-right py-3 font-medium text-gray-600">
                  Points attributed
                </th>
              </tr>
            </thead>
            <tbody>
              {mockReferralActivities.map((activity) => (
                <tr key={activity.id} className="border-b border-gray-100">
                  <td className="py-4 font-mono text-gray-900">
                    {activity.wallet}
                  </td>
                  <td className="py-4 text-gray-600">{activity.dateJoined}</td>
                  <td className="py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        activity.activityType === "Trading"
                          ? "bg-pink-100 text-pink-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {activity.activityType}
                    </span>
                  </td>
                  <td className="py-4 text-gray-900">
                    ${activity.totalVolume.toLocaleString()}
                  </td>
                  <td className="py-4 text-right text-gray-900 font-medium">
                    {activity.pointsAttributed.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <ReferralModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
