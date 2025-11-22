/*
  Warnings:

  - A unique constraint covering the columns `[playerName]` on the table `PlayerSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PlayerSession_playerName_key" ON "PlayerSession"("playerName");
