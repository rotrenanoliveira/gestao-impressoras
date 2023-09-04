-- CreateEnum
CREATE TYPE "DEVICE_STATUS" AS ENUM ('ok', 'warning', 'danger');

-- CreateEnum
CREATE TYPE "TRANSACTION_TYPE" AS ENUM ('insert', 'remove');

-- CreateTable
CREATE TABLE "devices" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "DEVICE_STATUS" NOT NULL,
    "department" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "computers" (
    "id" TEXT NOT NULL,
    "used_by" TEXT NOT NULL,
    "specs" JSONB NOT NULL,
    "device_id" TEXT NOT NULL,

    CONSTRAINT "computers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "printers" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "obs" TEXT,
    "rented_in" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3),
    "device_id" TEXT NOT NULL,

    CONSTRAINT "printers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ink-stock" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "printer_id" TEXT NOT NULL,

    CONSTRAINT "ink-stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock-transactions" (
    "id" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "type" "TRANSACTION_TYPE" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ink_id" TEXT NOT NULL,

    CONSTRAINT "stock-transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "licenses" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "init_at" TIMESTAMP(3) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" JSONB NOT NULL,
    "obs" TEXT,

    CONSTRAINT "licenses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "devices_id_key" ON "devices"("id");

-- CreateIndex
CREATE UNIQUE INDEX "computers_id_key" ON "computers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "computers_device_id_key" ON "computers"("device_id");

-- CreateIndex
CREATE UNIQUE INDEX "printers_id_key" ON "printers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "printers_device_id_key" ON "printers"("device_id");

-- CreateIndex
CREATE UNIQUE INDEX "ink-stock_id_key" ON "ink-stock"("id");

-- CreateIndex
CREATE UNIQUE INDEX "stock-transactions_id_key" ON "stock-transactions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "licenses_id_key" ON "licenses"("id");

-- AddForeignKey
ALTER TABLE "computers" ADD CONSTRAINT "computers_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "printers" ADD CONSTRAINT "printers_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ink-stock" ADD CONSTRAINT "ink-stock_printer_id_fkey" FOREIGN KEY ("printer_id") REFERENCES "printers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock-transactions" ADD CONSTRAINT "stock-transactions_ink_id_fkey" FOREIGN KEY ("ink_id") REFERENCES "ink-stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
