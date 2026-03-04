export type LeagueType =
  | "Kage"
  | "ANBU"
  | "Jonin"
  | "Chunin"
  | "Genin"
  | "Academy Student";

export function getLeagueFromPercentile(rank: number, totalUsers: number): LeagueType {
  const prevPos = (rank - 1) / totalUsers;
  if (prevPos < 0.01) return "Kage"; // top 1%
  if (prevPos < 0.05) return "ANBU"; // next 4%
  if (prevPos < 0.2) return "Jonin"; // next 15%
  if (prevPos < 0.5) return "Chunin"; // next 30%
  if (prevPos < 0.8) return "Genin"; // next 30%
  return "Academy Student"; // bottom 20%
}
