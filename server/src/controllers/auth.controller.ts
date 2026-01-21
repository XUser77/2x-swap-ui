import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";
import { signJwt } from "../lib/jwt.js";

export async function getNonce(req: Request, res: Response) {
  const { wallet } = req.body;

  if (!wallet) {
    return res.status(400).json({ error: "wallet is required" });
  }

  const nonce = await AuthService.generateNonce(wallet);

  return res.json({ nonce });
}

export async function loginWithWallet(req: Request, res: Response) {
  try {
    const { wallet, signature } = req.body;

    if (!wallet || !signature) {
      return res.status(400).json({ error: "wallet and signature required" });
    }

    const user = await AuthService.verifySignature(wallet, signature);

    const token = signJwt({
      id: user.id,
      wallet: user.wallet.toLowerCase(),
    });

    return res.json({
      token,
      user: {
        id: user.id,
        wallet: user.wallet.toLowerCase(),
      },
    });
  } catch (err: any) {
    return res.status(401).json({ error: err.message });
  }
}
