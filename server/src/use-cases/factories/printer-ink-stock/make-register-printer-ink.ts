import { PrismaPrinterInkStockRepository } from '@/repositories/prisma/prisma-printer-ink-stock-repository'
import { PrismaPrintersRepository } from '@/repositories/prisma/prisma-printers-repository'
import { RegisterPrinterInkUseCase } from '@/use-cases/printer-ink-stock/register'

export function makeRegisterPrinterInkUseCase() {
  const printerInkStockRepository = new PrismaPrinterInkStockRepository()
  const printersRepository = new PrismaPrintersRepository()
  const registerUseCase = new RegisterPrinterInkUseCase(printerInkStockRepository, printersRepository)
  return registerUseCase
}
