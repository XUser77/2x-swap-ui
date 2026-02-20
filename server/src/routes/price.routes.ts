import { Router } from "express";
import { get24hChange } from "../controllers/price.controller.js";

const router = Router();

router.get("/24h-change", get24hChange);

export default router;
