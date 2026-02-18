"use client";

import { useSeasonStatus } from "@/hooks/useSeasonStatus";
import { LeagueCard } from "../fragments/LeagueCard";

export type League = {
  id: string;
  name: string;
  icon: string;
  description: string;
  bgColor: string;
  textColor: string;
  iconBg: string;
  iconText: string;
  glowEffect?: boolean;
};

const leagues: League[] = [
  {
    id: "student",
    name: "Academy Student",
    icon: "学",
    description: "Just starting the journey.",
    bgColor: "bg-gray-100",
    textColor: "text-gray-700",
    iconBg: "bg-gray-300",
    iconText: "text-gray-600",
  },
  {
    id: "genin",
    name: "Genin",
    icon: "下忍",
    description: "Active beginners learning consistency.",
    bgColor: "bg-white",
    textColor: "text-gray-900",
    iconBg: "bg-pink-500",
    iconText: "text-white",
  },
  {
    id: "chunin",
    name: "Chunin",
    icon: "中忍",
    description: "Strategic users showing steady participation.",
    bgColor: "bg-white",
    textColor: "text-gray-900",
    iconBg: "bg-teal-500",
    iconText: "text-white",
  },
  {
    id: "jonin",
    name: "Jonin",
    icon: "上忍",
    description: "High-skill participants with confident performance.",
    bgColor: "bg-white",
    textColor: "text-gray-900",
    iconBg: "bg-blue-600",
    iconText: "text-white",
  },
  {
    id: "anbu",
    name: "ANBU",
    icon: "暗部",
    description: "Elite contributors with disciplined long-term presence.",
    bgColor: "bg-indigo-700",
    textColor: "text-white",
    iconBg: "bg-indigo-500",
    iconText: "text-white",
  },
  {
    id: "kage",
    name: "Kage",
    icon: "影",
    description: "Top-tier leaders shaping the protocol.",
    bgColor: "bg-black",
    textColor: "text-white",
    iconBg: "bg-transparent",
    iconText: "text-yellow-500",
    glowEffect: true,
  },
];

export default function LeaguesTab() {
  const { data } = useSeasonStatus(true);

  const { rank } = data;

  const activeLeagueId = rank.name;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Leagues</h2>
        <p className="text-gray-600">
          Ninja ranks reflect your participation in the protocol.
        </p>
        <p className="text-gray-600">
          Leagues are for ranking only and have no financial impact.
        </p>
      </div>

      {/* Leagues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {leagues.map((league) => (
          <LeagueCard
            key={league.id}
            league={league}
            isActive={league.name === activeLeagueId}
          />
        ))}
      </div>

      {/* Footer Note */}
      <p className="text-sm text-gray-600 bg-white px-4 py-2 rounded-xl">
        Leagues reset every season. Your all-time points are preserved.
      </p>
    </div>
  );
}
