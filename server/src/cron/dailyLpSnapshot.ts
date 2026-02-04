// cron/dailyLpSnapshot.ts
import cron from "node-cron";
import { LiquidityService } from "../services/liquidity.service.js";

// Run daily at 00:05 UTC
cron.schedule(
  "5 0 * * *",
  async () => {
    try {
      const now = new Date();

      // subtract 1 UTC day
      const previousDay = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1),
      );

      await LiquidityService.runDailySnapshot(previousDay);
      console.log("LP snapshot done for", previousDay.toISOString());
    } catch (e) {
      console.error("LP snapshot failed", e);
    }
  },
  {
    timezone: "UTC",
  },
);
