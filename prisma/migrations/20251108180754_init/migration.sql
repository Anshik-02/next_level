-- CreateEnum
CREATE TYPE "DeviceStatus" AS ENUM ('Active', 'UnderMaintenance', 'Disabled');

-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "status" "DeviceStatus" NOT NULL DEFAULT 'Active';

-- CreateTable
CREATE TABLE "DevicePricing" (
    "id" SERIAL NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "players" INTEGER NOT NULL,
    "pricePer30" DOUBLE PRECISION NOT NULL,
    "pricePerHour" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DevicePricing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DevicePricing" ADD CONSTRAINT "DevicePricing_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
