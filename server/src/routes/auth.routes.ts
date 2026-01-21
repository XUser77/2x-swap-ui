import { Router } from "express";
import { getNonce, loginWithWallet } from "../controllers/auth.controller.js";

const router = Router();

router.post("/nonce", getNonce);
router.post("/login", loginWithWallet);

export default router;
