import { useState } from "react";
import { ReferralLearnMore } from "../fragments/ReferralLearnMore";
import { ReferralStatCard } from "../fragments/ReferralStatCard";
import {
  useReferralStats,
  useReferralCode,
  useReferralActivity,
} from "@/hooks/useReferral";
import { Copy, createLucideIcon } from "lucide-react";
import { shareReferralOnTwitter } from "@/lib/tweetReferral";
import { ReferralActivityCard } from "../fragments/ReferralActivityCard";

export const XTwitterIcon = createLucideIcon("X", [
  [
    "path",
    {
      d: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
      stroke: "none",
      fill: "currentColor",
    },
  ],
]);

export default function ReferralsTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { data: stats } = useReferralStats();
  const { data: code } = useReferralCode();
  const { data: activities, isLoading } = useReferralActivity();

  function handleCopy(text?: string) {
    if (!text) return;

    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  return (
    <div className="bg-white p-8 space-y-6 rounded-xl">
      {/* Header */}
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

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ReferralStatCard
          label="Referred participants"
          value={stats?.referredParticipants ?? 0}
        />
        <ReferralStatCard
          label="Referral points (season)"
          value={stats?.referralPointsSeason ?? 0}
        />
        <ReferralStatCard
          label="Referral points (all-time)"
          value={stats?.referralPointsAllTime ?? 0}
        />
        <ReferralStatCard
          label="Active referrals (30d)"
          value={stats?.activeReferralsLast30Days ?? 0}
        />
      </div>

      {/* Referral code */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold mb-3">Your referral code</h3>
        <div className="flex gap-3 w-full flex-col md:flex-row">
          <input
            readOnly
            value={code?.referralCode ?? ""}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50"
          />
          <button
            onClick={() => handleCopy(code?.referralCode)}
            className="border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition-colors min-w-40"
            disabled={copied}
          >
            {copied ? (
              <span className="text-sm">Copied!</span>
            ) : (
              <div className="flex justify-center">
                <Copy className="mr-2 h-4 md:h-5" />
                <span className="text-xs md:text-sm">Copy</span>
              </div>
            )}
          </button>
        </div>
        <button
          onClick={() => shareReferralOnTwitter(code?.referralCode!)}
          className="text-sm hover:bg-blue-800/5 border-2 border-blue-800 text-blue-700 py-2 px-3 my-2 rounded-xl flex gap-2 font-semibold"
        >
          Share on <XTwitterIcon className="w-4 h-4 text-black" />
        </button>
        <p className="text-xs text-gray-500 mt-4">
          Referral points are attributed only while the referred wallet is
          active.
        </p>
      </div>

      {/* Activity table */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold mb-4">Referral activity</h3>

        {isLoading ? (
          <div className="text-sm text-gray-500">Loading activity…</div>
        ) : activities?.length === 0 ? (
          <div className="text-sm text-gray-500">
            There are no referral activities from your invitee
          </div>
        ) : (
          <div>
            <div className="hidden md:block overflow-x-auto">
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
                  {activities?.map((activity) => (
                    <tr
                      key={activity.wallet}
                      className="border-b border-gray-100"
                    >
                      <td className="py-4 font-mono text-gray-900">
                        {`${activity.wallet.slice(0, 8)}…${activity.wallet.slice(-6)}`}
                      </td>

                      <td className="py-4 text-gray-600">
                        {new Date(activity.dateJoined).toLocaleDateString()}
                      </td>

                      <td className="py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            activity.activityType === "Trading"
                              ? "bg-pink-100 text-pink-700"
                              : activity.activityType === "Liquidity"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-gray-100 text-gray-600"
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
            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {activities?.map((activity) => (
                <ReferralActivityCard
                  key={activity.wallet}
                  activity={activity}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <ReferralLearnMore open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
