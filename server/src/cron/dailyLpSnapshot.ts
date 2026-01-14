// cron/dailyLpSnapshot.ts
import cron from "node-cron";
import { LiquidityService } from "../services/liquidity.service";

// Run daily at 00:05 UTC
cron.schedule("5 0 * * *", async () => {
  try {
    await LiquidityService.runDailySnapshot(new Date());
    console.log("LP snapshot done");
  } catch (e) {
    console.error("LP snapshot failed", e);
  }
});
