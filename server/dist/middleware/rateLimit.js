"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitlistRateLimit = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.waitlistRateLimit = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // max 5 submissions per IP per window
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: "Too many requests. Please try again later.",
    },
});
