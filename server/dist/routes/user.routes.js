// routes/user.routes.ts
import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { checkUserExists, getUserSeasonStatus, } from "../controllers/user.controller";
const router = Router();
router.get("/exists", checkUserExists);
router.get("/season-status", requireAuth, getUserSeasonStatus);
export default router;
