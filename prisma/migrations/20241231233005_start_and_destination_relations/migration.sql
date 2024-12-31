/*
  Warnings:

  - Added the required column `title` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startId` to the `Ride` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ride" ADD COLUMN     "startId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_startId_fkey" FOREIGN KEY ("startId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
