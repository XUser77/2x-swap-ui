import { verifyJwt } from "../lib/jwt";
export function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Missing Authorization header" });
    }
    const token = authHeader.replace("Bearer ", "");
    try {
        const payload = verifyJwt(token);
        req.user = {
            id: payload.id,
            wallet: payload.wallet,
        };
        next();
    }
    catch {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}
