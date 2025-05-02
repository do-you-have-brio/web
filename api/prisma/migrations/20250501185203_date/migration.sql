/*
  Warnings:

  - Changed the type of `start_date` on the `Education` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `end_date` on the `Education` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Education" DROP COLUMN "start_date",
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
DROP COLUMN "end_date",
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL;
