"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradingService = void 0;
const prisma_js_1 = require("../lib/prisma.js");
const decimal_js_1 = __importDefault(require("decimal.js"));
const MAX_TRADES_PER_DAY = 20;
const LPHURT_SCORE_CAP = 200;
const TRADER_SOFTCAP_DAY = 2000;
const TRADER_SOFTCAP_RATE = 0.25;
const REF_RATE = 0.25;
const MIN_ACTIVITY_POINTS = 200;
class TradingService {
    static async processTrade(input) {
        const { wallet, txHash, volume, pnl, lpHurt, timestamp } = input;
        const user = await prisma_js_1.prisma.user.findUnique({
            where: { wallet: wallet.toLowerCase() },
            include: { referredBy: true },
        });
        if (!user)
            throw new Error("User not found");
        const season = await prisma_js_1.prisma.season.findFirst({
            where: { isActive: true },
        });
        if (!season)
            throw new Error("No active season");
        /** ---- Eligibility ---- */
        const V_MIN = season.name === "Alpha" ? 100 : season.name === "Beta" ? 250 : 500;
        const tradeVolume = new decimal_js_1.default(volume).div(1e6).toNumber();
        if (tradeVolume < V_MIN) {
            return { skipped: true, reason: "Below V_MIN" };
        }
        /** ---- Day boundary ---- */
        const dayStart = new Date(timestamp * 1000);
        dayStart.setUTCHours(0, 0, 0, 0);
        /** ---- Anti-farming ---- */
        const dailyCount = await prisma_js_1.prisma.tradeScore.count({
            where: {
                userId: user.id,
                createdAt: { gte: dayStart },
            },
        });
        if (dailyCount >= MAX_TRADES_PER_DAY) {
            return { skipped: true, reason: "Max trades per day reached" };
        }
        /** ---- Base score ---- */
        const base = tradeVolume / 1000;
        let multiplier = 0;
        if (pnl > 0 && !lpHurt)
            multiplier = 2.0;
        else if (pnl <= 0 && !lpHurt)
            multiplier = 0.2;
        else
            multiplier = 0.1;
        let finalScore = base * multiplier;
        /** ---- LP hurt cap ---- */
        if (lpHurt) {
            const lpHurtSum = await prisma_js_1.prisma.tradeScore.aggregate({
                where: {
                    userId: user.id,
                    lpHurt: true,
                    createdAt: { gte: dayStart },
                },
                _sum: { finalScore: true },
            });
            if ((lpHurtSum._sum.finalScore ?? 0) >= LPHURT_SCORE_CAP) {
                finalScore = 0;
            }
        }
        /** ---- Whale soft cap ---- */
        const dailySum = await prisma_js_1.prisma.tradeScore.aggregate({
            where: {
                userId: user.id,
                createdAt: { gte: dayStart },
            },
            _sum: { finalScore: true },
        });
        if ((dailySum._sum.finalScore ?? 0) > TRADER_SOFTCAP_DAY) {
            finalScore *= TRADER_SOFTCAP_RATE;
        }
        /** ---- Persist TradeScore ---- */
        const trade = await prisma_js_1.prisma.tradeScore.create({
            data: {
                userId: user.id,
                seasonId: season.id,
                txHash,
                volume: tradeVolume,
                baseScore: base,
                multiplier,
                finalScore,
                lpHurt,
            },
        });
        /** ---- Update trader SeasonTotal ---- */
        const effectiveTraderPoints = finalScore * season.multiplier;
        const traderSeasonTotal = await prisma_js_1.prisma.seasonTotal.upsert({
            where: {
                userId_seasonId: {
                    userId: user.id,
                    seasonId: season.id,
                },
            },
            update: {
                traderActivityPoints: { increment: effectiveTraderPoints },
                totalPoints: { increment: effectiveTraderPoints },
            },
            create: {
                userId: user.id,
                seasonId: season.id,
                traderActivityPoints: effectiveTraderPoints,
                totalPoints: effectiveTraderPoints,
            },
        });
        /** ---- Referral logic ---- */
        if (user.referredById) {
            await this.applyReferralReward({
                seasonId: season.id,
                seasonMultiplier: season.multiplier,
                invitee: traderSeasonTotal,
                referrerId: user.referredById,
            });
        }
        return trade;
    }
    /** ---------------- Referral ---------------- */
    static async applyReferralReward(input) {
        const { seasonId, invitee, referrerId } = input;
        const inviteeActivity = invitee.traderActivityPoints + invitee.lpActivityPoints;
        if (inviteeActivity < MIN_ACTIVITY_POINTS)
            return;
        const referrerTotal = await prisma_js_1.prisma.seasonTotal.findUnique({
            where: {
                userId_seasonId: {
                    userId: referrerId,
                    seasonId,
                },
            },
        });
        if (!referrerTotal)
            return;
        const referrerActivity = referrerTotal.traderActivityPoints + referrerTotal.lpActivityPoints;
        if (referrerActivity < MIN_ACTIVITY_POINTS)
            return;
        /** ---- Referral points ---- */
        const rawReferral = inviteeActivity * REF_RATE;
        const referralCap = referrerActivity * 2;
        const referralPoints = Math.min(rawReferral, referralCap);
        if (referralPoints <= 0)
            return;
        /** ---- Persist ReferralEarning ---- */
        await prisma_js_1.prisma.referralEarning.upsert({
            where: {
                referrerId_inviteeId_seasonId: {
                    referrerId,
                    inviteeId: invitee.userId,
                    seasonId,
                },
            },
            update: {
                referralPoints,
                inviteeActivityPoints: inviteeActivity,
                capped: rawReferral > referralCap,
            },
            create: {
                referrerId,
                inviteeId: invitee.userId,
                seasonId,
                inviteeActivityPoints: inviteeActivity,
                referralPoints,
                capped: rawReferral > referralCap,
            },
        });
        /** ---- Update referrer SeasonTotal ---- */
        await prisma_js_1.prisma.seasonTotal.update({
            where: {
                userId_seasonId: {
                    userId: referrerId,
                    seasonId,
                },
            },
            data: {
                referralPoints: { increment: referralPoints },
                totalPoints: { increment: referralPoints },
            },
        });
    }
}
exports.TradingService = TradingService;
