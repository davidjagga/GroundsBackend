/*
  Warnings:

  - You are about to drop the column `locationId` on the `Ride` table. All the data in the column will be lost.
  - Added the required column `destinationId` to the `Ride` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ride" DROP CONSTRAINT "Ride_locationId_fkey";

-- AlterTable
ALTER TABLE "Ride" DROP COLUMN "locationId",
ADD COLUMN     "destinationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
