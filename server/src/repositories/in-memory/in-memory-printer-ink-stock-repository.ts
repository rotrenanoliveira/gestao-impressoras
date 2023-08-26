import { randomUUID } from 'node:crypto'
import { PrinterInkStockRepository } from '../printer-ink-stock-repository'
import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'

export class InMemoryPrinterInkStockRepository implements PrinterInkStockRepository {
  public items: PrinterInkStockSchema[] = []

  async findMany(): Promise<PrinterInkStock[]> {
    const inkStock = this.items.map((ink) => {
      const { id, name, quantity, printer_id } = ink
      return { id, name, quantity, printer: { id: printer_id, name: '' } }
    })

    return inkStock
  }

  async findManyByPrinter(printerId: string): Promise<PrinterInkStock[]> {
    const inkStock = this.items
      .filter((ink) => ink.printer_id === printerId)
      .map((ink) => {
        const { id, name, quantity, printer_id } = ink
        return { id, name, quantity, printer: { id: printer_id, name: '' } }
      })

    return inkStock
  }

  async findById(inkId: string): Promise<PrinterInkStock | null> {
    const inkStock = this.items.find((ink) => ink.id === inkId)

    if (!inkStock) {
      return null
    }

    const { id, name, quantity, printer_id } = inkStock
    const ink = { id, name, quantity, printer: { id: printer_id, name: '' } }

    return ink
  }

  async create(data: PrinterInkStockCreateInput): Promise<PrinterInkStock> {
    const inkStock: PrinterInkStockSchema = {
      id: randomUUID(),
      name: data.name,
      printer_id: data.printerId,
      quantity: data.quantity,
    }

    this.items.push(inkStock)

    const { id, name, quantity, printer_id } = inkStock
    const ink = { id, name, quantity, printer: { id: printer_id, name: '' } }

    return ink
  }

  async save(inkId: string, data: PrinterInkStockSaveInput): Promise<PrinterInkStock> {
    const inkIndex = this.items.findIndex((ink) => ink.id === inkId)

    if (inkIndex < 0) {
      throw new ResourceNotFound('printer ink')
    }

    this.items[inkIndex] = {
      ...this.items[inkIndex],
      name: data.name,
    }

    const { id, name, quantity, printer_id } = this.items[inkIndex]
    const ink = { id, name, quantity, printer: { id: printer_id, name: '' } }

    return ink
  }

  async stockTransaction(inkId: string, transaction: 'insert' | 'remove'): Promise<void> {
    const inkIndex = this.items.findIndex((ink) => ink.id === inkId)

    if (inkIndex < 0) {
      throw new ResourceNotFound('ink stock')
    }

    const { quantity: inkStockQuantity } = this.items[inkIndex]
    const stockQuantity = transaction === 'insert' ? inkStockQuantity + 1 : inkStockQuantity - 1

    this.items[inkIndex] = {
      ...this.items[inkIndex],
      quantity: stockQuantity,
    }

    return
  }

  async remove(inkId: string): Promise<PrinterInkStock> {
    const inkIndex = this.items.findIndex((ink) => ink.id === inkId)

    if (inkIndex < 0) {
      throw new ResourceNotFound('ink stock')
    }

    const { id, name, quantity, printer_id } = this.items[inkIndex]
    const ink = { id, name, quantity, printer: { id: printer_id, name: '' } }
    this.items.splice(inkIndex, 1)

    return ink
  }
}
