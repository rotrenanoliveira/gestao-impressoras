import { prisma } from '@/lib/prisma'
import { createPrinter } from './create-printer'

/**
 * @returns Ink { name: 'black ink', quantity: 10 }
 */
export async function createPrinterInk(): Promise<PrinterInkStock> {
  const { id: printerId } = await createPrinter()

  const ink = await prisma.printerInkStock.create({
    data: {
      name: 'black ink',
      quantity: 10,
      printer_id: printerId,
    },
  })

  const inkInfo = await prisma.printerInkInfo.findUniqueOrThrow({
    where: { id: ink.id },
  })

  return {
    id: inkInfo.id,
    name: inkInfo.ink_name,
    quantity: inkInfo.quantity,
    printer: {
      id: inkInfo.printer_id,
      name: inkInfo.printer_name,
    },
  }
}
