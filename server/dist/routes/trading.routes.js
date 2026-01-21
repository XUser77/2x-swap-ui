"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/trading.routes.ts
const express_1 = require("express");
const trading_controller_js_1 = require("../controllers/trading.controller.js");
const router = (0, express_1.Router)();
router.post("/internal/trading/score", trading_controller_js_1.ingestTradeScore);
exports.default = router;
