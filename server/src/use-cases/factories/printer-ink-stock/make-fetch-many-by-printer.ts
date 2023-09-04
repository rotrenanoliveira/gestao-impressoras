import { PrismaPrinterInkStockRepository } from '@/repositories/prisma/prisma-printer-ink-stock-repository'
import { FetchManyPrinterInkStockByPrinterUseCase } from '@/use-cases/printer-ink-stock/fetch-many-by-printer'

export function makeFetchManyInkByPrinterUseCase() {
  const printerInkStockRepository = new PrismaPrinterInkStockRepository()
  const fetchManyUseCase = new FetchManyPrinterInkStockByPrinterUseCase(printerInkStockRepository)
  return fetchManyUseCase
}
