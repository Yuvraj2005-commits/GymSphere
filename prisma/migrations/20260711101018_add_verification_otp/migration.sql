-- CreateTable
CREATE TABLE "VerificationOTP" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationOTP_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VerificationOTP_email_idx" ON "VerificationOTP"("email");
