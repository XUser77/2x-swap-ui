"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSeasonStatus = getUserSeasonStatus;
exports.checkUserExists = checkUserExists;
const user_service_js_1 = require("../services/user.service.js");
async function getUserSeasonStatus(req, res) {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: "Unauthorized" });
        const data = await user_service_js_1.UserStatsService.getSeasonStatus(userId);
        return res.json(data);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
async function checkUserExists(req, res) {
    try {
        const wallet = req.query.wallet;
        if (!wallet) {
            return res.status(400).json({ error: "wallet is required" });
        }
        const data = await user_service_js_1.UserStatsService.checkWallet(wallet);
        return res.json(data);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
