/*
  Warnings:

  - You are about to drop the column `colorMode` on the `printer` table. All the data in the column will be lost.
  - You are about to drop the column `printingType` on the `printer` table. All the data in the column will be lost.
  - Added the required column `color_mode` to the `printer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `printing_type` to the `printer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "printer" DROP COLUMN "colorMode",
DROP COLUMN "printingType",
ADD COLUMN     "color_mode" "PRINTER_COLORMODE" NOT NULL,
ADD COLUMN     "printing_type" "PRINTER_TECNOLOGY" NOT NULL;
