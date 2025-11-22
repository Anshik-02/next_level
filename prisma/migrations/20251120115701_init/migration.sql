/*
  Warnings:

  - You are about to drop the column `totalTimePlayer` on the `PlayerSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlayerSession" DROP COLUMN "totalTimePlayer",
ADD COLUMN     "totalPausedDuration" INTEGER NOT NULL DEFAULT 0;
