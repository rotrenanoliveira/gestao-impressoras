import { PrismaPrinterInkStockRepository } from '@/repositories/prisma/prisma-printer-ink-stock-repository'
import { RemovePrinterInkUseCase } from '@/use-cases/printer-ink-stock/remove'

export function makeRemovePrinterInkUseCase() {
  const printerInkStockRepository = new PrismaPrinterInkStockRepository()
  const removeUseCase = new RemovePrinterInkUseCase(printerInkStockRepository)
  return removeUseCase
}
