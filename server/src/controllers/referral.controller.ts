import { Request, Response } from "express";
import { ReferralService } from "../services/referral.service";

/**
 * STEP WHERE REFERRAL IS LOCKED
 */
export async function AttachReferral(req: Request, res: Response) {
  try {
    const { wallet, referralCode } = req.body;

    const result = await ReferralService.attachReferral({
      wallet,
      referralCode,
    });

    return res.json({
      success: true,
      user: {
        id: result.userId,
        wallet,
      },
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      error: err.message ?? "Unknown error",
    });
  }
}

/**
 * GET /referrals/stats
 */
export async function getReferralStats(req: Request, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) return res.status(400).json({ error: "Invalid user id" });

    const stats = await ReferralService.getReferralStats(userId);

    return res.json(stats);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

/**
 * GET /referrals/code
 */
export async function getReferralCode(req: Request, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) return res.status(400).json({ error: "Invalid user id" });

    const data = await ReferralService.getReferralCode(userId);

    return res.json(data);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

/**
 * GET /referrals/activity
 */
export async function getReferralActivity(req: Request, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) return res.status(400).json({ error: "Invalid user id" });

    const activity = await ReferralService.getReferralActivity(userId);

    return res.json(activity);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
