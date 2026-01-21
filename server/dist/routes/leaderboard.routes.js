"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/leaderboard.routes.ts
const express_1 = require("express");
const leaderboard_controller_js_1 = require("../controllers/leaderboard.controller.js");
const router = (0, express_1.Router)();
router.get("/", leaderboard_controller_js_1.getLeaderboard);
exports.default = router;
