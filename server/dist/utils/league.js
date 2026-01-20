export function getLeagueFromPercentile(p) {
    if (p <= 0.01)
        return "Kage"; // top 1%
    if (p <= 0.05)
        return "ANBU"; // next 4%
    if (p <= 0.2)
        return "Jonin"; // next 15%
    if (p <= 0.5)
        return "Chunin"; // next 30%
    if (p <= 0.8)
        return "Genin"; // next 30%
    return "Academy Student"; // bottom 20%
}
