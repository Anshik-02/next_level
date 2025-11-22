/*
  Warnings:

  - Added the required column `device` to the `PlayerSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlayerSession" ADD COLUMN     "device" TEXT NOT NULL;
