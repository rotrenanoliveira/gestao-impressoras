import { PrintersRepository } from '@/domain/it-manager/application/repositories/printers-repository'
import { Printer } from '@/domain/it-manager/enterprise/entities/printer'

export class InMemoryPrintersRepository implements PrintersRepository {
  public items: Printer[] = []

  async findById(printerId: string): Promise<Printer | null> {
    const printer = this.items.find((printer) => printer.id.toString() === printerId)

    return printer ?? null
  }

  async findMany(): Promise<Printer[]> {
    const printers = this.items

    return printers
  }

  async create(printer: Printer): Promise<void> {
    this.items.push(printer)
  }

  async save(printer: Printer): Promise<void> {
    const printerIndex = this.items.findIndex((item) => item.equals(printer))

    this.items[printerIndex] = printer
  }

  async delete(printer: Printer): Promise<void> {
    const printerIndex = this.items.findIndex((item) => item.equals(printer))

    this.items.splice(printerIndex, 1)
  }
}
