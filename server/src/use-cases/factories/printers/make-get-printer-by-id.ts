import { PrismaPrintersRepository } from '@/repositories/prisma/prisma-printers-repository'
import { GetPrinterByIdUseCase } from '@/use-cases/printers/get-by-id'

export function makeGetPrinterByIdUseCase() {
  const printersRepository = new PrismaPrintersRepository()
  const getPrinterUseCase = new GetPrinterByIdUseCase(printersRepository)
  return getPrinterUseCase
}
