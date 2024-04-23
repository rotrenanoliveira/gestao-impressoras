/*
  Warnings:

  - Added the required column `operating_system` to the `computers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "computers" ADD COLUMN     "operating_system" TEXT NOT NULL;
