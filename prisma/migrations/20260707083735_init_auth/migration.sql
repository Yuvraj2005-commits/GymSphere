/*
  Warnings:

  - You are about to drop the column `email` on the `Trainer` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Trainer` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Trainer` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Trainer` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Trainer` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Trainer` table. All the data in the column will be lost.
  - You are about to drop the column `gymId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Trainer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Trainer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_gymId_fkey";

-- DropIndex
DROP INDEX "Trainer_gymId_idx";

-- DropIndex
DROP INDEX "User_gymId_idx";

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Trainer" DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "image",
DROP COLUMN "isActive",
DROP COLUMN "lastName",
DROP COLUMN "phone",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "gymId",
DROP COLUMN "isActive",
DROP COLUMN "password",
DROP COLUMN "role",
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "Owner" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gymId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_userId_key" ON "Owner"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Member_userId_key" ON "Member"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Trainer_userId_key" ON "Trainer"("userId");

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trainer" ADD CONSTRAINT "Trainer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
