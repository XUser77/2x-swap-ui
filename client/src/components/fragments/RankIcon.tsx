import { Award, Crown } from "lucide-react";

// Helper function to get rank icon
export function getRankIcon(rank: number) {
  if (rank === 1) return <Crown className="text-yellow-400 w-4.5" />;
  if (rank === 2) return <Award className="text-gray-400 w-4.5" />;
  if (rank === 3) return <Award className="text-yellow-700 w-4.5" />;
  return "";
}
