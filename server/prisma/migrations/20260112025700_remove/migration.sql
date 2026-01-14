/*
  Warnings:

  - You are about to drop the column `lpPoints` on the `SeasonTotal` table. All the data in the column will be lost.
  - You are about to drop the column `traderPoints` on the `SeasonTotal` table. All the data in the column will be lost.
  - You are about to drop the `WeeklyScore` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `SeasonTotal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WeeklyScore" DROP CONSTRAINT "WeeklyScore_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "WeeklyScore" DROP CONSTRAINT "WeeklyScore_userId_fkey";

-- AlterTable
ALTER TABLE "SeasonTotal" DROP COLUMN "lpPoints",
DROP COLUMN "traderPoints",
ADD COLUMN     "lpActivityPoints" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "traderActivityPoints" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "referralPoints" SET DEFAULT 0,
ALTER COLUMN "contributorPoints" SET DEFAULT 0,
ALTER COLUMN "totalPoints" SET DEFAULT 0;

-- DropTable
DROP TABLE "WeeklyScore";
