/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `JournalEntry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "JournalEntry_date_key" ON "JournalEntry"("date");
