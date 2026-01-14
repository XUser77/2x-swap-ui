import cron from "node-cron";
import { SeasonService } from "../services/season.service";

// Run daily at 00:10 UTC (cheap & safe)
cron.schedule("10 0 * * *", async () => {
  try {
    const result = await SeasonService.rotateSeason();
    if (!result?.skipped) {
      console.log("Season rotated:", result);
    }
  } catch (err) {
    console.error("Season rotation failed", err);
  }
});
