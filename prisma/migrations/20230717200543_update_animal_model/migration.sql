/*
  Warnings:

  - Added the required column `image` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isChiped` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vetVisit` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "isChiped" BOOLEAN NOT NULL,
ADD COLUMN     "vetVisit" TIMESTAMP(3) NOT NULL;
