/*
  Warnings:

  - You are about to drop the column `adminId` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Donation` table. All the data in the column will be lost.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_userId_fkey";

-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "adminId";

-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "adminId";

-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" INTEGER NOT NULL;
