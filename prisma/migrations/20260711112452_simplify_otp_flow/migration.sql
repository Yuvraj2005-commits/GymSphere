/*
  Warnings:

  - You are about to drop the `VerificationOTP` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `otp` to the `PendingRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PendingRegistration" ADD COLUMN     "otp" TEXT NOT NULL;

-- DropTable
DROP TABLE "VerificationOTP";
