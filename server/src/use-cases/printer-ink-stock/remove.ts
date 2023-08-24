import { ResourceNotFound } from '../errors/resource-not-found'
import { PrinterInkStockRepository } from '@/repositories/printer-ink-stock-repository'

export class RemovePrinterInkUseCase {
  constructor(private printerInkStockRepository: PrinterInkStockRepository) {}

  async execute(inkId: string): Promise<void> {
    const printerInk = await this.printerInkStockRepository.findById(inkId)

    if (!printerInk) {
      throw new ResourceNotFound('printer ink')
    }

    await this.printerInkStockRepository.remove(inkId)

    return
  }
}
