import { Router } from "express";
import { AttachReferral, getReferralStats, getReferralCode, getReferralActivity, } from "../controllers/referral.controller";
import { requireAuth } from "../middleware/auth.middleware";
const router = Router();
// Referral locking (already exists)
router.post("/attach-referral", AttachReferral);
// New read-only referral APIs
router.get("/stats", requireAuth, getReferralStats);
router.get("/code", requireAuth, getReferralCode);
router.get("/activity", requireAuth, getReferralActivity);
export default router;
