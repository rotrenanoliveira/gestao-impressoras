/*
  Warnings:

  - You are about to drop the column `colorModel` on the `printer` table. All the data in the column will be lost.
  - Added the required column `colorMode` to the `printer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "printer" DROP COLUMN "colorModel",
ADD COLUMN     "colorMode" "PRINTER_COLORMODE" NOT NULL;
