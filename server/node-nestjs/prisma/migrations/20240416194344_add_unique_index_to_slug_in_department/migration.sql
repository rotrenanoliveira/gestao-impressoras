/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `departments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "departments_slug_key" ON "departments"("slug");
