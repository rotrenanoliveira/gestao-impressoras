/*
  Warnings:

  - You are about to drop the `inventory_transactions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rented_devices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "inventory_transactions" DROP CONSTRAINT "inventory_transactions_item_id_fkey";

-- DropForeignKey
ALTER TABLE "rented_devices" DROP CONSTRAINT "rented_devices_device_id_fkey";

-- DropTable
DROP TABLE "inventory_transactions";

-- DropTable
DROP TABLE "rented_devices";

-- CreateTable
CREATE TABLE "rented-devices" (
    "id" TEXT NOT NULL,
    "supplier" TEXT NOT NULL,
    "rented_in" TIMESTAMP(3) NOT NULL,
    "contract_expiration" TIMESTAMP(3) NOT NULL,
    "obs" TEXT,
    "device_id" TEXT NOT NULL,

    CONSTRAINT "rented-devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory-transactions" (
    "id" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "transaction_type" "TRANSACTION_TYPE" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "item_id" TEXT NOT NULL,

    CONSTRAINT "inventory-transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rented-devices_device_id_key" ON "rented-devices"("device_id");

-- AddForeignKey
ALTER TABLE "rented-devices" ADD CONSTRAINT "rented-devices_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory-transactions" ADD CONSTRAINT "inventory-transactions_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
