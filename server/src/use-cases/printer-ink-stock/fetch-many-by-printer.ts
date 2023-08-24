import { PrinterInkStockRepository } from '@/repositories/printer-ink-stock-repository'

export class FetchManyPrinterInkStockByPrinterUseCase {
  constructor(private printerInkStockRepository: PrinterInkStockRepository) {}

  async execute(printerId: string): Promise<{ inkStock: PrinterInkStock[] }> {
    const inkStock = await this.printerInkStockRepository.findManyByPrinter(printerId)

    return {
      inkStock,
    }
  }
}
