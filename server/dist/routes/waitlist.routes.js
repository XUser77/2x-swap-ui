import { Router } from "express";
import { WaitlistController } from "../controllers/waitlist.controller";
import { waitlistRateLimit } from "../middleware/rateLimit";
const router = Router();
router.post("/addWaitlist", waitlistRateLimit, WaitlistController.join);
export default router;
