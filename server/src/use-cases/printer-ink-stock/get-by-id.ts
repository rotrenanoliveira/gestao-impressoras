import { PrinterInkStockRepository } from '@/repositories/printer-ink-stock-repository'
import { ResourceNotFound } from '../errors/resource-not-found'

export class GetPrinterInkByIdUseCase {
  constructor(private printerInkStockRepository: PrinterInkStockRepository) {}

  async execute(inkId: string): Promise<{ ink: PrinterInkStock }> {
    const ink = await this.printerInkStockRepository.findById(inkId)

    if (!ink) {
      throw new ResourceNotFound('printer ink')
    }

    return {
      ink,
    }
  }
}
