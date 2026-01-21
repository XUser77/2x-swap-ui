"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNonce = getNonce;
exports.loginWithWallet = loginWithWallet;
const auth_service_js_1 = require("../services/auth.service.js");
const jwt_1 = require("../lib/jwt");
async function getNonce(req, res) {
    const { wallet } = req.body;
    if (!wallet) {
        return res.status(400).json({ error: "wallet is required" });
    }
    const nonce = await auth_service_js_1.AuthService.generateNonce(wallet);
    return res.json({ nonce });
}
async function loginWithWallet(req, res) {
    try {
        const { wallet, signature } = req.body;
        if (!wallet || !signature) {
            return res.status(400).json({ error: "wallet and signature required" });
        }
        const user = await auth_service_js_1.AuthService.verifySignature(wallet, signature);
        const token = (0, jwt_1.signJwt)({
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
    }
    catch (err) {
        return res.status(401).json({ error: err.message });
    }
}
