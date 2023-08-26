import { PrismaPrinterInkStockRepository } from '@/repositories/prisma/prisma-printer-ink-stock-repository'
import { GetPrinterInkByIdUseCase } from '@/use-cases/printer-ink-stock/get-by-id'

export function makeGetPrinterInkByIdUseCase() {
  const printerInkStockRepository = new PrismaPrinterInkStockRepository()
  const getPrinterInkUseCase = new GetPrinterInkByIdUseCase(printerInkStockRepository)
  return getPrinterInkUseCase
}
