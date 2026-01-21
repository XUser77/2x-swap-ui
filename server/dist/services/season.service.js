"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeasonService = void 0;
const prisma_js_1 = require("../lib/prisma.js");
const date_fns_1 = require("date-fns");
const SEASONS = [
    { name: "Alpha", multiplier: 3 },
    { name: "Beta", multiplier: 2 },
    { name: "Growth", multiplier: 1 },
];
class SeasonService {
    static async rotateSeason(now = new Date()) {
        return prisma_js_1.prisma.$transaction(async (tx) => {
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
            const currentIndex = SEASONS.findIndex((s) => s.name === activeSeason.name);
            if (currentIndex === -1 || currentIndex === SEASONS.length - 1) {
                throw new Error("No next season configured");
            }
            const next = SEASONS[currentIndex + 1];
            /**
             * 5. Create next season
             */
            const startAt = (0, date_fns_1.startOfDay)(activeSeason.endAt);
            const endAt = (0, date_fns_1.endOfDay)((0, date_fns_1.addMonths)(startAt, 3));
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
exports.SeasonService = SeasonService;
