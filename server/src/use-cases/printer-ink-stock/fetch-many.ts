import { PrinterInkStockRepository } from '@/repositories/printer-ink-stock-repository'

export class FetchManyPrinterInkStockUseCase {
  constructor(private printerInkStockRepository: PrinterInkStockRepository) {}

  async execute(): Promise<{ inkStock: PrinterInkStock[] }> {
    const inkStock = await this.printerInkStockRepository.findMany()

    return {
      inkStock,
    }
  }
}
