/*
  Warnings:

  - You are about to drop the `rented-devices` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `supplier` to the `devices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "rented-devices" DROP CONSTRAINT "rented-devices_device_id_fkey";

-- AlterTable
ALTER TABLE "devices" ADD COLUMN     "contract_expiration" TIMESTAMP(3),
ADD COLUMN     "obs" TEXT,
ADD COLUMN     "rented_in" TIMESTAMP(3),
ADD COLUMN     "supplier" TEXT NOT NULL;

-- DropTable
DROP TABLE "rented-devices";
