"use client";

import {
  getLeagueBadgeStyle,
  getLeagueFromPoints,
  getRankIcon,
  type LeaderboardEntry,
} from "@/lib/pointHelpers";

const mockLeaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    wallet: "0xA1B2...E5F6",
    seasonPoints: 152340,
    totalPoints: 485920,
  },
  {
    rank: 2,
    wallet: "0x9F8E...5B4A",
    seasonPoints: 148760,
    totalPoints: 412870,
  },
  {
    rank: 3,
    wallet: "0x3C4D...7A8B",
    seasonPoints: 142180,
    totalPoints: 398640,
  },
  {
    rank: 4,
    wallet: "0x7E8F...1C2D",
    seasonPoints: 138920,
    totalPoints: 367540,
  },
  {
    rank: 5,
    wallet: "0x5D6E...9B0C",
    seasonPoints: 135470,
    totalPoints: 342190,
  },
  {
    rank: 6,
    wallet: "0x2B3C...6F7A",
    seasonPoints: 129850,
    totalPoints: 298450,
  },
  {
    rank: 7,
    wallet: "0x8A9B...2E3F",
    seasonPoints: 124320,
    totalPoints: 276890,
  },
  {
    rank: 8,
    wallet: "0x4F5A...8D9E",
    seasonPoints: 118760,
    totalPoints: 245320,
  },
  {
    rank: 9,
    wallet: "0x1E2F...5C6D",
    seasonPoints: 112940,
    totalPoints: 198750,
  },
  {
    rank: 10,
    wallet: "0x6C7D...0A1B",
    seasonPoints: 108560,
    totalPoints: 176430,
  },
  {
    rank: 11,
    wallet: "0x9A0B...3E4F",
    seasonPoints: 102340,
    totalPoints: 152840,
  },
  {
    rank: 12,
    wallet: "0x5E6F...9C0D",
    seasonPoints: 98750,
    totalPoints: 134920,
  },
];

export default function LeaderboardTab() {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-6 font-medium text-gray-600">
                Rank
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-600">
                Wallet
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-600">
                League
              </th>
              <th className="text-right py-4 px-6 font-medium text-gray-600">
                Season Points
              </th>
              <th className="text-right py-4 px-6 font-medium text-gray-600">
                Total Points
              </th>
            </tr>
          </thead>
          <tbody>
            {mockLeaderboardData.map((entry) => (
              <tr key={entry.rank} className="border-b border-gray-100">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    {getRankIcon(entry.rank) && (
                      <span className="text-lg">{getRankIcon(entry.rank)}</span>
                    )}
                    <span className="text-gray-900 font-medium">
                      #{entry.rank}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 font-mono text-gray-900">
                  {entry.wallet}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getLeagueBadgeStyle(
                      getLeagueFromPoints(entry.seasonPoints)
                    )}`}
                  >
                    {`${getLeagueFromPoints(entry.seasonPoints)}`}
                  </span>
                </td>
                <td className="py-4 px-6 text-right text-gray-900 font-medium">
                  {entry.seasonPoints.toLocaleString()}
                </td>
                <td className="py-4 px-6 text-right text-gray-900 font-medium">
                  {entry.totalPoints.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
