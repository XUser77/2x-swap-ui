-- CreateTable
CREATE TABLE "UserLPState" (
    "userId" TEXT NOT NULL,
    "pool" TEXT NOT NULL,
    "lastBalance" DECIMAL(65,30) NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "currentStreak" INTEGER NOT NULL,

    CONSTRAINT "UserLPState_pkey" PRIMARY KEY ("userId")
);
