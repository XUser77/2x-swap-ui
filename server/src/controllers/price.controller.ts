import { Request, Response } from "express";
import { PriceService } from "../services/price.service.js";

export async function get24hChange(req: Request, res: Response) {
  try {
    const symbol = req.query.symbol as string;

    if (!symbol) {
      return res.status(400).json({ error: "symbol is required" });
    }

    const data = await PriceService.get24hChange(symbol);

    return res.json(data);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
