"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const referral_controller_js_1 = require("../controllers/referral.controller.js");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
const router = (0, express_1.Router)();
// Referral locking (already exists)
router.post("/attach-referral", referral_controller_js_1.AttachReferral);
// New read-only referral APIs
router.get("/stats", auth_middleware_js_1.requireAuth, referral_controller_js_1.getReferralStats);
router.get("/code", auth_middleware_js_1.requireAuth, referral_controller_js_1.getReferralCode);
router.get("/activity", auth_middleware_js_1.requireAuth, referral_controller_js_1.getReferralActivity);
exports.default = router;
