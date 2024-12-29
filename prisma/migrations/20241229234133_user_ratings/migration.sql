-- CreateEnum
CREATE TYPE "Status" AS ENUM ('EMPTY', 'PENDING', 'FULL');

-- CreateEnum
CREATE TYPE "Approval" AS ENUM ('APPROVED', 'DENIED', 'PENDING');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "gradYear" INTEGER,
    "profile" TEXT,
    "totalRidesGiven" INTEGER NOT NULL DEFAULT 0,
    "totalRidesTaken" INTEGER NOT NULL DEFAULT 0,
    "riderRating" DECIMAL(65,30) NOT NULL DEFAULT 5.0,
    "driverRating" DECIMAL(65,30) NOT NULL DEFAULT 5.0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ride" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3),
    "rideStatus" "Status" NOT NULL DEFAULT 'EMPTY',
    "desc" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Ride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RideRequests" (
    "userId" TEXT NOT NULL,
    "rideId" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "approval" "Approval" NOT NULL DEFAULT 'PENDING',
    "requestTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RideRequests_pkey" PRIMARY KEY ("userId","rideId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideRequests" ADD CONSTRAINT "RideRequests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideRequests" ADD CONSTRAINT "RideRequests_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
