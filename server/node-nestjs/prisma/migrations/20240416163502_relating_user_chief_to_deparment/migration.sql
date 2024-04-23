/*
  Warnings:

  - A unique constraint covering the columns `[chief_id]` on the table `departments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "departments" ADD COLUMN     "chief_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "departments_chief_id_key" ON "departments"("chief_id");

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_chief_id_fkey" FOREIGN KEY ("chief_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
