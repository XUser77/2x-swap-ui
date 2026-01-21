import { Router } from "express";
import { WaitlistController } from "../controllers/waitlist.controller.js";
import { waitlistRateLimit } from "../middleware/rateLimit.js";

const router = Router();

router.post("/addWaitlist", waitlistRateLimit, WaitlistController.join);

export default router;
