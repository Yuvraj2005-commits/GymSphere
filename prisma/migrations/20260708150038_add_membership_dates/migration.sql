-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "membershipEnd" TIMESTAMP(3),
ADD COLUMN     "membershipStart" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
