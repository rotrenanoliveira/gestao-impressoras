import { prisma } from '@/lib/prisma'
import { PrinterInkStockRepository } from '../printer-ink-stock-repository'

const xprisma = prisma.$extends({
  result: {
    printerInkInfo: {
      name: {
        needs: { ink_name: true },
        compute(ink) {
          return `${ink.ink_name}`
        },
      },
      printer: {
        needs: { printer_name: true, printer_id: true },
        compute(ink) {
          return {
            id: ink.printer_id,
            name: ink.printer_name,
          }
        },
      },
    },
  },
})

export class PrismaPrinterInkStockRepository implements PrinterInkStockRepository {
  private querySelect = {
    id: true,
    name: true,
    quantity: true,
    printer: true,
  }

  async findMany(): Promise<PrinterInkStock[]> {
    const inkStock = await xprisma.printerInkInfo.findMany({
      select: { ...this.querySelect },
    })

    return inkStock
  }

  async findManyByPrinter(printerId: string): Promise<PrinterInkStock[]> {
    const inkStock = await xprisma.printerInkInfo.findMany({
      where: { printer_id: printerId },
      select: { ...this.querySelect },
    })

    return inkStock
  }

  async findById(inkId: string): Promise<PrinterInkStock | null> {
    const ink = await xprisma.printerInkInfo.findUnique({
      where: { id: inkId },
      select: { ...this.querySelect },
    })

    return ink
  }

  async create(data: PrinterInkStockCreateInput): Promise<PrinterInkStock> {
    const printerInk = await prisma.printerInkStock.create({
      data: {
        name: data.name,
        quantity: data.quantity,
        printer_id: data.printerId,
      },
    })

    const printerInkStock = await xprisma.printerInkInfo.findFirstOrThrow({
      where: { id: printerInk.id },
      select: { ...this.querySelect },
    })

    return printerInkStock
  }

  async save(inkId: string, data: PrinterInkStockSaveInput): Promise<PrinterInkStock> {
    await prisma.printerInkStock.update({
      where: { id: inkId },
      data: {
        name: data.name,
      },
    })

    const ink = await xprisma.printerInkInfo.findUniqueOrThrow({
      where: { id: inkId },
      select: { ...this.querySelect },
    })

    return ink
  }

  async stockTransaction(inkId: string, transaction: 'insert' | 'remove'): Promise<void> {
    const { quantity: inkStockQuantity } = await prisma.printerInkStock.findUniqueOrThrow({
      where: { id: inkId },
      select: { quantity: true },
    })

    await prisma.printerInkStock.update({
      where: { id: inkId },
      data: {
        quantity: transaction === 'insert' ? inkStockQuantity + 1 : inkStockQuantity - 1,
      },
    })

    return
  }

  async remove(inkId: string): Promise<PrinterInkStock> {
    const printerInk = await xprisma.printerInkInfo.findUniqueOrThrow({
      where: { id: inkId },
      select: { ...this.querySelect },
    })

    await prisma.printerInkStock.delete({
      where: { id: inkId },
    })

    return printerInk
  }
}
