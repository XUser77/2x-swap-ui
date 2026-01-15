export type LeaderboardEntry = {
  rank: number;
  wallet: string;
  seasonPoints: number;
  totalPoints: number;
};

// Helper function to convert season points to league
export function getLeagueFromPoints(points: number): string {
  if (points >= 145000) return "Kage";
  if (points >= 130000) return "ANBU";
  if (points >= 115000) return "Jonin";
  if (points >= 100000) return "Chunin";
  if (points >= 85000) return "Genin";
  return "Student";
}

// Helper function to get league badge styling
export function getLeagueBadgeStyle(league: string): string {
  const styles: Record<string, string> = {
    Kage: "bg-black text-yellow-500",
    ANBU: "bg-indigo-700 text-white",
    Jonin: "bg-blue-600 text-white",
    Chunin: "bg-teal-500 text-white",
    Genin: "bg-pink-500 text-white",
    "Academy Student": "bg-gray-300 text-gray-700",
  };
  return styles[league];
}

// Helper function to get rank icon
export function getRankIcon(rank: number): string {
  if (rank === 1) return "👑";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return "";
}
