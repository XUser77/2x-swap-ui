export function getRankKanji(rankName: string): string {
  const map: Record<string, string> = {
    Unranked: "?",
    Student: "学",
    Genin: "下忍",
    Chunin: "中忍",
    Jonin: "上忍",
    Anbu: "暗部",
    Kage: "影",
  };

  return map[rankName] ?? "";
}

export function getRankBgColor(rankName: string): string {
  const map: Record<string, string> = {
    Student: "bg-gray-300 text-gray-700",
    "Academy Student": "bg-gray-300 text-gray-700",

    Genin: "bg-pink-500 text-white",
    Chunin: "bg-teal-500 text-white",
    Jonin: "bg-blue-600 text-white",
    ANBU: "bg-indigo-600 text-white",
    Kage: "bg-black text-yellow-400",
  };

  return map[rankName] ?? "bg-gray-300 text-gray-700";
}
