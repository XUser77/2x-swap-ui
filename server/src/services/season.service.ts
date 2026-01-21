import { prisma } from "../lib/prisma.js";
import { addMonths, startOfDay, endOfDay } from "date-fns";

type SeasonConfig = {
  name: string;
  multiplier: number;
};

const SEASONS: SeasonConfig[] = [
  { name: "Alpha", multiplier: 3 },
  { name: "Beta", multiplier: 2 },
  { name: "Growth", multiplier: 1 },
];

export class SeasonService {
  static async rotateSeason(now: Date = new Date()) {
    return prisma.$transaction(async (tx) => {
      /**
       * 1. Find active season
       */
      const activeSeason = await tx.season.findFirst({
        where: { isActive: true },
      });

      if (!activeSeason) {
        throw new Error("No active season found");
      }

      /**
       * 2. Safety check: only rotate AFTER season end
       */
      if (now < activeSeason.endAt) {
        return {
          skipped: true,
          reason: "Season not ended yet",
        };
      }

      /**
       * 3. Close current season
       */
      await tx.season.update({
        where: { id: activeSeason.id },
        data: { isActive: false },
      });

      /**
       * 4. Determine next season config
       */
      const currentIndex = SEASONS.findIndex(
        (s) => s.name === activeSeason.name,
      );

      if (currentIndex === -1 || currentIndex === SEASONS.length - 1) {
        throw new Error("No next season configured");
      }

      const next = SEASONS[currentIndex + 1];

      /**
       * 5. Create next season
       */
      const startAt = startOfDay(activeSeason.endAt);
      const endAt = endOfDay(addMonths(startAt, 3));

      const newSeason = await tx.season.create({
        data: {
          name: next.name,
          multiplier: next.multiplier,
          startAt,
          endAt,
          isActive: true,
        },
      });

      /**
       * 6. Reset LP loyalty streaks (season-based)
       */
      await tx.userLPState.updateMany({
        data: {
          currentStreak: 0,
        },
      });

      return {
        rotated: true,
        closedSeason: activeSeason.name,
        newSeason: newSeason.name,
      };
    });
  }
}
