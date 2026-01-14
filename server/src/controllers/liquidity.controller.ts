// // controllers/liquidity.controller.ts
// import { Request, Response } from "express";
// import { LiquidityService } from "../services/liquidity.service";

// export async function runDailyLpSnapshot(req: Request, res: Response) {
//   try {
//     if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const result = await LiquidityService.runDailySnapshot(new Date());
//     return res.json({ success: true, result });
//   } catch (err: any) {
//     console.error(err);
//     return res.status(500).json({ error: err.message });
//   }
// }
