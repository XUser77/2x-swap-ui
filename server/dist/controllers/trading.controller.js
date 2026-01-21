"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestTradeScore = ingestTradeScore;
const trading_service_js_1 = require("../services/trading.service.js");
async function ingestTradeScore(req, res) {
    try {
        if (req.headers.authorization !== `Bearer ${process.env.INDEXER_SECRET}`) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const data = await trading_service_js_1.TradingService.processTrade(req.body);
        return res.json({ success: true, data });
    }
    catch (err) {
        console.error(err);
        return res.status(400).json({ error: err.message });
    }
}
