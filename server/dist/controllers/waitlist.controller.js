"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitlistController = void 0;
const waitlist_service_js_1 = require("../services/waitlist.service.js");
const validator_1 = __importDefault(require("validator"));
class WaitlistController {
    static async join(req, res) {
        try {
            const { email } = req.body;
            if (!email || typeof email !== "string") {
                return res.status(400).json({
                    error: "Email is required",
                });
            }
            const normalizedEmail = email.trim().toLowerCase();
            if (!validator_1.default.isEmail(normalizedEmail)) {
                return res.status(400).json({ error: "Invalid email address" });
            }
            const result = await waitlist_service_js_1.WaitlistService.addEmail(normalizedEmail);
            return res.status(201).json({
                success: true,
                data: result,
            });
        }
        catch (err) {
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
exports.WaitlistController = WaitlistController;
