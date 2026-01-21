// controllers/leaderboard.controller.ts
import { Request, Response } from "express";
import { LeaderboardService } from "../services/leaderboard.service.js";

export async function getLeaderboard(req: Request, res: Response) {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 20, 50);

    const data = await LeaderboardService.getLeaderboard({
      page,
      limit,
    });

    return res.json(data);
  } catch (err: any) {
    return res.status(500).json({
      error: err.message ?? "Failed to load leaderboard",
    });
  }
}
