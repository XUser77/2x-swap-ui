-- CreateEnum
CREATE TYPE "PointSource" AS ENUM ('TRADING', 'LIQUIDITY', 'REFERRAL', 'CONTRIBUTOR');

-- CreateEnum
CREATE TYPE "ScoreStatus" AS ENUM ('PENDING', 'FINAL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "referralCode" TEXT NOT NULL,
    "referredById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "multiplier" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeScore" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "txHash" TEXT NOT NULL,
    "volume" DECIMAL(65,30) NOT NULL,
    "baseScore" DOUBLE PRECISION NOT NULL,
    "multiplier" DOUBLE PRECISION NOT NULL,
    "finalScore" DOUBLE PRECISION NOT NULL,
    "lpHurt" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TradeScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiquiditySnapshot" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "avgDailyBalance" DECIMAL(65,30) NOT NULL,
    "loyaltyMultiplier" DOUBLE PRECISION NOT NULL,
    "baseScore" DOUBLE PRECISION NOT NULL,
    "finalScore" DOUBLE PRECISION NOT NULL,
    "snapshotDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LiquiditySnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyScore" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "weekStart" TIMESTAMP(3) NOT NULL,
    "traderScore" DOUBLE PRECISION NOT NULL,
    "lpScore" DOUBLE PRECISION NOT NULL,
    "traderPoints" DOUBLE PRECISION NOT NULL,
    "lpPoints" DOUBLE PRECISION NOT NULL,
    "status" "ScoreStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeeklyScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralEarning" (
    "id" TEXT NOT NULL,
    "referrerId" TEXT NOT NULL,
    "inviteeId" TEXT NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "inviteeActivityPoints" DOUBLE PRECISION NOT NULL,
    "referralPoints" DOUBLE PRECISION NOT NULL,
    "capped" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReferralEarning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeasonTotal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "traderPoints" DOUBLE PRECISION NOT NULL,
    "lpPoints" DOUBLE PRECISION NOT NULL,
    "referralPoints" DOUBLE PRECISION NOT NULL,
    "contributorPoints" DOUBLE PRECISION NOT NULL,
    "totalPoints" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SeasonTotal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_wallet_key" ON "User"("wallet");

-- CreateIndex
CREATE UNIQUE INDEX "User_referralCode_key" ON "User"("referralCode");

-- CreateIndex
CREATE INDEX "User_wallet_idx" ON "User"("wallet");

-- CreateIndex
CREATE INDEX "Season_isActive_idx" ON "Season"("isActive");

-- CreateIndex
CREATE INDEX "TradeScore_userId_seasonId_idx" ON "TradeScore"("userId", "seasonId");

-- CreateIndex
CREATE INDEX "TradeScore_txHash_idx" ON "TradeScore"("txHash");

-- CreateIndex
CREATE INDEX "LiquiditySnapshot_userId_snapshotDate_idx" ON "LiquiditySnapshot"("userId", "snapshotDate");

-- CreateIndex
CREATE UNIQUE INDEX "WeeklyScore_userId_seasonId_weekStart_key" ON "WeeklyScore"("userId", "seasonId", "weekStart");

-- CreateIndex
CREATE UNIQUE INDEX "ReferralEarning_referrerId_inviteeId_seasonId_key" ON "ReferralEarning"("referrerId", "inviteeId", "seasonId");

-- CreateIndex
CREATE UNIQUE INDEX "SeasonTotal_userId_seasonId_key" ON "SeasonTotal"("userId", "seasonId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeScore" ADD CONSTRAINT "TradeScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeScore" ADD CONSTRAINT "TradeScore_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiquiditySnapshot" ADD CONSTRAINT "LiquiditySnapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiquiditySnapshot" ADD CONSTRAINT "LiquiditySnapshot_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyScore" ADD CONSTRAINT "WeeklyScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyScore" ADD CONSTRAINT "WeeklyScore_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralEarning" ADD CONSTRAINT "ReferralEarning_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralEarning" ADD CONSTRAINT "ReferralEarning_inviteeId_fkey" FOREIGN KEY ("inviteeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralEarning" ADD CONSTRAINT "ReferralEarning_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTotal" ADD CONSTRAINT "SeasonTotal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTotal" ADD CONSTRAINT "SeasonTotal_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
