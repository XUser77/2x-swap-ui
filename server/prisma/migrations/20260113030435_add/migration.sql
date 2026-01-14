-- CreateTable
CREATE TABLE "WaitlistMail" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WaitlistMail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WaitlistMail_email_key" ON "WaitlistMail"("email");

-- CreateIndex
CREATE INDEX "WaitlistMail_email_idx" ON "WaitlistMail"("email");
