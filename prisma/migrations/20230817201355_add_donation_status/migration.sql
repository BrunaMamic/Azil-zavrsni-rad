/*
  Warnings:

  - Added the required column `isDonated` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "isDonated" BOOLEAN NOT NULL;
