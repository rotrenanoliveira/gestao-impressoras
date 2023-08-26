import { PrismaPrinterInkStockRepository } from '@/repositories/prisma/prisma-printer-ink-stock-repository'
import { SavePrinterInkUseCase } from '@/use-cases/printer-ink-stock/save'

export function makeSavePrinterInkUseCase() {
  const printerInkStockRepository = new PrismaPrinterInkStockRepository()
  const saveUseCase = new SavePrinterInkUseCase(printerInkStockRepository)
  return saveUseCase
}
