/*
  Warnings:

  - A unique constraint covering the columns `[userId,snapshotDate]` on the table `LiquiditySnapshot` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "LiquiditySnapshot_userId_snapshotDate_idx";

-- CreateIndex
CREATE UNIQUE INDEX "LiquiditySnapshot_userId_snapshotDate_key" ON "LiquiditySnapshot"("userId", "snapshotDate");
