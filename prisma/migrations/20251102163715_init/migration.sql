/*
  Warnings:

  - Added the required column `players` to the `PlayerSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlayerSession" ADD COLUMN     "players" INTEGER NOT NULL;
