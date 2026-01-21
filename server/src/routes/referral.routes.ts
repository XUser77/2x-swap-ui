import { Router } from "express";
import {
  AttachReferral,
  getReferralStats,
  getReferralCode,
  getReferralActivity,
} from "../controllers/referral.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

// Referral locking (already exists)
router.post("/attach-referral", AttachReferral);

// New read-only referral APIs
router.get("/stats", requireAuth, getReferralStats);
router.get("/code", requireAuth, getReferralCode);
router.get("/activity", requireAuth, getReferralActivity);

export default router;
