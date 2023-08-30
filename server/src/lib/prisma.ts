import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : ['error'],
})

// async function createView() {
//   await prisma.$queryRaw`
//     CREATE VIEW "ComputerInfo" AS
//     SELECT c.id, name, status, specs, used_by, device_id
//     FROM "computers" c
//     LEFT JOIN "devices" d ON d.id = c."device_id";
//   `

//   await prisma.$queryRaw`
//     CREATE VIEW "PrinterInfo" AS
//     SELECT p.id, device_id, ip, name, department, status, rented_in, expires_at, obs
//     FROM "printers" p
//     LEFT JOIN "devices" d ON d.id = p."device_id";
//   `

//   await prisma.$queryRaw`
//     CREATE VIEW "PrinterInkInfo" AS
//     SELECT ink.id, ink.printer_id, ink.name AS ink_name, ink.quantity, d.name AS printer_name
//     FROM "ink-stock" ink
//     LEFT JOIN "printers" p ON p.id = ink.printer_id
//     LEFT JOIN "devices" d ON d.id = p.device_id;
//   `

//   await prisma.$queryRaw`
//     CREATE VIEW "InkStockTransactionInfo" AS
//     SELECT t.id, operator, name, created_at, type, ink_id
//     FROM "stock-transactions" t
//     LEFT JOIN "ink-stock" ink ON ink_id = ink.id
//   `

//   console.log('View was created successfully.')
// }

// createView()
//   .catch((error) => {
//     console.error('Error creating view:', error)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
