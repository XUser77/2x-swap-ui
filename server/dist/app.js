"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const referral_routes_js_1 = __importDefault(require("./routes/referral.routes.js"));
const auth_routes_js_1 = __importDefault(require("./routes/auth.routes.js"));
const user_routes_js_1 = __importDefault(require("./routes/user.routes.js"));
const leaderboard_routes_js_1 = __importDefault(require("./routes/leaderboard.routes.js"));
const waitlist_routes_js_1 = __importDefault(require("./routes/waitlist.routes.js"));
const trading_routes_js_1 = __importDefault(require("./routes/trading.routes.js"));
require("./cron/dailyLpSnapshot.js");
require("./cron/seasonRotation.js");
const app = (0, express_1.default)();
const allowedOrigins = process.env.FRONTEND_URL;
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(body_parser_1.default.json());
app.use("/api/referral", referral_routes_js_1.default);
app.use("/api/auth", auth_routes_js_1.default);
app.use("/api/user", user_routes_js_1.default);
app.use("/api/leaderboard", leaderboard_routes_js_1.default);
app.use("/api/waitlist", waitlist_routes_js_1.default);
app.use("/api/trading", trading_routes_js_1.default);
app.get("/health", (_, res) => {
    res.json({ status: "ok" });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
