"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const season_service_js_1 = require("../services/season.service.js");
// Run daily at 00:10 UTC (cheap & safe)
node_cron_1.default.schedule("10 0 * * *", async () => {
    try {
        const result = await season_service_js_1.SeasonService.rotateSeason();
        if (!result?.skipped) {
            console.log("Season rotated:", result);
        }
    }
    catch (err) {
        console.error("Season rotation failed", err);
    }
});
