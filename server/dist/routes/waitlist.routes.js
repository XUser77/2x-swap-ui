"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const waitlist_controller_js_1 = require("../controllers/waitlist.controller.js");
const rateLimit_js_1 = require("../middleware/rateLimit.js");
const router = (0, express_1.Router)();
router.post("/addWaitlist", rateLimit_js_1.waitlistRateLimit, waitlist_controller_js_1.WaitlistController.join);
exports.default = router;
