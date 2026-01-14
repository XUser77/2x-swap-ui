import { Router } from "express";
import { getNonce, loginWithWallet } from "../controllers/auth.controller";

const router = Router();

router.post("/nonce", getNonce);
router.post("/login", loginWithWallet);

export default router;
