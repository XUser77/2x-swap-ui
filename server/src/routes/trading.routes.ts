// routes/trading.routes.ts
import { Router } from "express";
import { ingestTradeScore } from "../controllers/trading.controller";

const router = Router();

router.post("/internal/trading/score", ingestTradeScore);

export default router;
