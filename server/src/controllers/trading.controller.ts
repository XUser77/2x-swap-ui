// controllers/trading.controller.ts
import { Request, Response } from "express";
import { TradingService } from "../services/trading.service.js";

export async function ingestTradeScore(req: Request, res: Response) {
  try {
    if (req.headers.authorization !== `Bearer ${process.env.INDEXER_SECRET}`) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const data = await TradingService.processTrade(req.body);

    return res.json({ success: true, data });
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
}
