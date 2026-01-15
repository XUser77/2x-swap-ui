import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import referralRoutes from "./routes/referral.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import leaderboardRoutes from "./routes/leaderboard.routes";
import waitlistRoutes from "./routes/waitlist.routes";
import tradingRoutes from "./routes/trading.routes";

const app = express();
const allowedOrigins = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use("/api/referral", referralRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/waitlist", waitlistRoutes);
app.use("/api/trading", tradingRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
