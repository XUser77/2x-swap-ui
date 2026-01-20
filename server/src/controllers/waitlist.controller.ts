import { Request, Response } from "express";
import { WaitlistService } from "../services/waitlist.service";
import validator from "validator";

export class WaitlistController {
  static async join(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email || typeof email !== "string") {
        return res.status(400).json({
          error: "Email is required",
        });
      }

      const normalizedEmail = email.trim().toLowerCase();

      if (!validator.isEmail(normalizedEmail)) {
        return res.status(400).json({ error: "Invalid email address" });
      }

      const result = await WaitlistService.addEmail(normalizedEmail);

      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (err: any) {
      if (err.code === "P2002") {
        // Prisma unique constraint
        return res.status(409).json({
          error: "Email already waitlisted",
        });
      }

      console.error(err);
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  }
}
