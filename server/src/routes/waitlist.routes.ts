import { Router } from "express";
import { WaitlistController } from "../controllers/waitlist.controller";

const router = Router();

router.post("/waitlist", WaitlistController.join);

export default router;
