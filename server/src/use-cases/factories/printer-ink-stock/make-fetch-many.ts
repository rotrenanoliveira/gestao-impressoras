import { PrismaPrinterInkStockRepository } from '@/repositories/prisma/prisma-printer-ink-stock-repository'
import { FetchManyPrinterInkStockUseCase } from '@/use-cases/printer-ink-stock/fetch-many'

export function makeFetchManyPrinterInkUseCase() {
  const printerInkStockRepository = new PrismaPrinterInkStockRepository()
  const fetchManyUseCase = new FetchManyPrinterInkStockUseCase(printerInkStockRepository)
  return fetchManyUseCase
}
