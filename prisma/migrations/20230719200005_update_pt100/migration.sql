/*
  Warnings:

  - Changed the type of `adopted` on the `Animal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "adopted",
ADD COLUMN     "adopted" BOOLEAN NOT NULL;
