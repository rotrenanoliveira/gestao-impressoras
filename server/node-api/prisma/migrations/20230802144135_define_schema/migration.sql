-- CreateEnum
CREATE TYPE "ACQUISITION_TYPE" AS ENUM ('BOUGHT', 'RENTED');

-- CreateEnum
CREATE TYPE "DEVICE_STATUS" AS ENUM ('OK', 'WARNING', 'DANGER');

-- CreateEnum
CREATE TYPE "TRANSACTION_TYPE" AS ENUM ('INSERT', 'REMOVE');

-- CreateTable
CREATE TABLE "devices" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" "DEVICE_STATUS" NOT NULL,
    "acquisition_type" "ACQUISITION_TYPE" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rented_devices" (
    "id" TEXT NOT NULL,
    "supplier" TEXT NOT NULL,
    "rented_in" TIMESTAMP(3) NOT NULL,
    "contract_expiration" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "obs" TEXT,
    "device_id" TEXT NOT NULL,

    CONSTRAINT "rented_devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "device_id" TEXT,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_transactions" (
    "id" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "transaction_type" "TRANSACTION_TYPE" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "item_id" TEXT NOT NULL,

    CONSTRAINT "inventory_transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rented_devices" ADD CONSTRAINT "rented_devices_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_transactions" ADD CONSTRAINT "inventory_transactions_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
