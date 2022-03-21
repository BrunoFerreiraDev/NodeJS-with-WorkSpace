/*
  Warnings:

  - You are about to drop the column `parental_guidance` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "parental_guidance",
ADD COLUMN     "parentalGuidance" "ParentalGuidance" NOT NULL DEFAULT E'GENERAL_AUDIENCE';
