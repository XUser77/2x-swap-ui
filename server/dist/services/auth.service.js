"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_js_1 = require("../lib/prisma.js");
const crypto_1 = require("crypto");
const ethers_1 = require("ethers");
class AuthService {
    static async generateNonce(wallet) {
        const nonce = `Login-${(0, crypto_1.randomBytes)(8).toString("hex")}`;
        await prisma_js_1.prisma.user.upsert({
            where: { wallet: wallet.toLowerCase() },
            update: { nonce },
            create: {
                wallet,
                referralCode: (0, crypto_1.randomBytes)(4).toString("hex").toUpperCase(),
                nonce,
            },
        });
        return nonce;
    }
    static async verifySignature(wallet, signature) {
        const user = await prisma_js_1.prisma.user.findUnique({
            where: { wallet: wallet.toLowerCase() },
        });
        if (!user || !user.nonce) {
            throw new Error("Nonce not found. Request nonce first.");
        }
        const recovered = (0, ethers_1.verifyMessage)(user.nonce, signature);
        if (recovered.toLowerCase() !== wallet.toLowerCase()) {
            throw new Error("Invalid signature");
        }
        // Clear nonce (important!)
        await prisma_js_1.prisma.user.update({
            where: { id: user.id },
            data: { nonce: null },
        });
        return user;
    }
}
exports.AuthService = AuthService;
