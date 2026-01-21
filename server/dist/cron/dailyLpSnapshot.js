"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// cron/dailyLpSnapshot.ts
const node_cron_1 = __importDefault(require("node-cron"));
const liquidity_service_js_1 = require("../services/liquidity.service.js");
// Run daily at 00:05 UTC
node_cron_1.default.schedule("5 0 * * *", async () => {
    try {
        await liquidity_service_js_1.LiquidityService.runDailySnapshot(new Date());
        console.log("LP snapshot done");
    }
    catch (e) {
        console.error("LP snapshot failed", e);
    }
});
