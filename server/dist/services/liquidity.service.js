"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiquidityService = void 0;
// services/liquidity.service.ts
const prisma_js_1 = require("../lib/prisma.js");
const decimal_js_1 = __importDefault(require("decimal.js"));
const date_fns_1 = require("date-fns");
const ponderGraphQl_js_1 = require("../lib/ponderGraphQl.js");
const LP_SOFTCAP_DAY = 5000;
const LP_SOFTCAP_RATE = 0.25;
const REF_RATE = 0.25;
function applySoftCap(score) {
    if (score <= LP_SOFTCAP_DAY)
        return score;
    return LP_SOFTCAP_DAY + (score - LP_SOFTCAP_DAY) * LP_SOFTCAP_RATE;
}
class LiquidityService {
    static async runDailySnapshot(date) {
        const USDC_DECIMALS = 6;
        const USDC_SCALE = new decimal_js_1.default(10).pow(USDC_DECIMALS);
        const season = await prisma_js_1.prisma.season.findFirst({
            where: { isActive: true },
        });
        if (!season)
            throw new Error("No active season");
        const dayStart = (0, date_fns_1.startOfDay)(date);
        const dayEnd = (0, date_fns_1.endOfDay)(date);
        const LP_MIN = season.name === "Alpha" ? 200 : season.name === "Beta" ? 500 : 1000;
        /** ---------------- 1. Fetch checkpoints ---------------- */
        const data = await (0, ponderGraphQl_js_1.fetchFromPonder)(ponderGraphQl_js_1.DAY_QUERY, {
            start: Math.floor(dayStart.getTime() / 1000),
            end: Math.floor(dayEnd.getTime() / 1000),
        });
        /** ---------------- 2. Aggregate per wallet ---------------- */
        const perWallet = new Map();
        for (const row of data.lpBalanceCheckpoints.items) {
            const balance = new decimal_js_1.default(row.assets).div(USDC_SCALE).toNumber();
            const wallet = row.user.toLowerCase();
            if (!perWallet.has(wallet)) {
                perWallet.set(wallet, { sum: 0, count: 0, endBalance: balance });
            }
            const acc = perWallet.get(wallet);
            acc.sum += balance;
            acc.count += 1;
            acc.endBalance = balance;
        }
        /** ---------------- 3. Load ALL LP users (carry forward holders) ---------------- */
        const previousLPStates = await prisma_js_1.prisma.userLPState.findMany();
        const allWallets = new Set([
            ...Array.from(perWallet.keys()),
            ...previousLPStates.map((s) => s.userId), // temporarily userId, mapped below
        ]);
        /** ---------------- 4. Resolve wallets → userIds ---------------- */
        const users = await prisma_js_1.prisma.user.findMany({
            where: {
                OR: [
                    { wallet: { in: Array.from(allWallets) } },
                    { id: { in: previousLPStates.map((s) => s.userId) } },
                ],
            },
        });
        /** ---------------- 5. Process each LP user ---------------- */
        for (const user of users) {
            const wallet = user.wallet.toLowerCase();
            const checkpoint = perWallet.get(wallet);
            const prevState = previousLPStates.find((s) => s.userId === user.id);
            let avgDailyBalance = 0;
            let endBalance = prevState ? prevState.lastBalance.toNumber() : 0;
            if (checkpoint) {
                avgDailyBalance = checkpoint.sum / checkpoint.count;
                endBalance = checkpoint.endBalance;
            }
            else if (prevState) {
                if (prevState.lastBalance.eq(0)) {
                    await this.resetStreak(user.id);
                    continue;
                }
                avgDailyBalance = prevState.lastBalance.toNumber();
            }
            else {
                continue; // no LP ever
            }
            if (avgDailyBalance < LP_MIN) {
                await this.resetStreak(user.id);
                continue;
            }
            /** ---------------- 6. Loyalty streak ---------------- */
            const lpState = await prisma_js_1.prisma.userLPState.upsert({
                where: { userId: user.id },
                update: {
                    lastBalance: new decimal_js_1.default(endBalance),
                    lastUpdated: dayEnd,
                    currentStreak: { increment: 1 },
                },
                create: {
                    userId: user.id,
                    pool: "X2POOL",
                    lastBalance: new decimal_js_1.default(endBalance),
                    lastUpdated: dayEnd,
                    currentStreak: 1,
                },
            });
            let loyaltyMultiplier = 1.0;
            if (lpState.currentStreak >= 30)
                loyaltyMultiplier = 2.0;
            else if (lpState.currentStreak >= 7)
                loyaltyMultiplier = 1.5;
            /** ---------------- 7. Score ---------------- */
            const baseScore = avgDailyBalance / 1000;
            const rawScore = baseScore * loyaltyMultiplier;
            const finalScore = applySoftCap(rawScore);
            /** ---------------- 8. Persist snapshot ---------------- */
            await prisma_js_1.prisma.liquiditySnapshot.upsert({
                where: {
                    userId_snapshotDate: {
                        userId: user.id,
                        snapshotDate: dayStart,
                    },
                },
                update: {
                    avgDailyBalance: new decimal_js_1.default(avgDailyBalance),
                    loyaltyMultiplier,
                    baseScore,
                    finalScore,
                },
                create: {
                    userId: user.id,
                    seasonId: season.id,
                    avgDailyBalance: new decimal_js_1.default(avgDailyBalance),
                    loyaltyMultiplier,
                    baseScore,
                    finalScore,
                    snapshotDate: dayStart,
                },
            });
            /** ---------------- 9. Update SeasonTotal ---------------- */
            const seasonPoints = finalScore * season.multiplier;
            const seasonTotal = await prisma_js_1.prisma.seasonTotal.upsert({
                where: {
                    userId_seasonId: {
                        userId: user.id,
                        seasonId: season.id,
                    },
                },
                update: {
                    lpActivityPoints: { increment: seasonPoints },
                    totalPoints: { increment: seasonPoints },
                },
                create: {
                    userId: user.id,
                    seasonId: season.id,
                    lpActivityPoints: seasonPoints,
                    totalPoints: seasonPoints,
                },
            });
            /** ---------------- 10. Referral ---------------- */
            await this.applyReferral(user.id, season, seasonTotal);
        }
        return { processed: users.length };
    }
    static async resetStreak(userId) {
        await prisma_js_1.prisma.userLPState.updateMany({
            where: { userId },
            data: { currentStreak: 0 },
        });
    }
    static async applyReferral(userId, season, seasonTotal) {
        const user = await prisma_js_1.prisma.user.findUnique({
            where: { id: userId },
            include: { referredBy: true },
        });
        if (!user?.referredById)
            return;
        const referrerTotal = await prisma_js_1.prisma.seasonTotal.findUnique({
            where: {
                userId_seasonId: {
                    userId: user.referredById,
                    seasonId: season.id,
                },
            },
        });
        const inviteeActivity = seasonTotal.traderActivityPoints + seasonTotal.lpActivityPoints;
        const referrerActivity = (referrerTotal?.traderActivityPoints ?? 0) +
            (referrerTotal?.lpActivityPoints ?? 0);
        if (inviteeActivity < 200 || referrerActivity < 200)
            return;
        const rawReferral = inviteeActivity * REF_RATE;
        const referralCap = referrerActivity * 2;
        const referralPoints = Math.min(rawReferral, referralCap);
        await prisma_js_1.prisma.referralEarning.upsert({
            where: {
                referrerId_inviteeId_seasonId: {
                    referrerId: user.referredById,
                    inviteeId: userId,
                    seasonId: season.id,
                },
            },
            update: {
                referralPoints,
                inviteeActivityPoints: inviteeActivity,
                capped: rawReferral > referralCap,
            },
            create: {
                referrerId: user.referredById,
                inviteeId: userId,
                seasonId: season.id,
                referralPoints,
                inviteeActivityPoints: inviteeActivity,
                capped: rawReferral > referralCap,
            },
        });
        await prisma_js_1.prisma.seasonTotal.update({
            where: {
                userId_seasonId: {
                    userId: user.referredById,
                    seasonId: season.id,
                },
            },
            data: {
                referralPoints: { increment: referralPoints },
                totalPoints: { increment: referralPoints },
            },
        });
    }
}
exports.LiquidityService = LiquidityService;
