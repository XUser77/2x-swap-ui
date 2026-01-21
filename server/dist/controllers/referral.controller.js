"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachReferral = AttachReferral;
exports.getReferralStats = getReferralStats;
exports.getReferralCode = getReferralCode;
exports.getReferralActivity = getReferralActivity;
const referral_service_js_1 = require("../services/referral.service.js");
/**
 * STEP WHERE REFERRAL IS LOCKED
 */
async function AttachReferral(req, res) {
    try {
        const { wallet, referralCode } = req.body;
        const result = await referral_service_js_1.ReferralService.attachReferral({
            wallet,
            referralCode,
        });
        return res.json({
            success: true,
            user: {
                id: result.userId,
                wallet,
            },
        });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message ?? "Unknown error",
        });
    }
}
/**
 * GET /referrals/stats
 */
async function getReferralStats(req, res) {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(400).json({ error: "Invalid user id" });
        const stats = await referral_service_js_1.ReferralService.getReferralStats(userId);
        return res.json(stats);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
/**
 * GET /referrals/code
 */
async function getReferralCode(req, res) {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(400).json({ error: "Invalid user id" });
        const data = await referral_service_js_1.ReferralService.getReferralCode(userId);
        return res.json(data);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
/**
 * GET /referrals/activity
 */
async function getReferralActivity(req, res) {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(400).json({ error: "Invalid user id" });
        const activity = await referral_service_js_1.ReferralService.getReferralActivity(userId);
        return res.json(activity);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
