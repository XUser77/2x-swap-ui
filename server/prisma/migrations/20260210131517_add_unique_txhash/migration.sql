/*
  Warnings:

  - A unique constraint covering the columns `[txHash]` on the table `TradeScore` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TradeScore_txHash_key" ON "TradeScore"("txHash");
