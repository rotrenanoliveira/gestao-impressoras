import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'
import { PrismaPrintersRepository } from '@/repositories/prisma/prisma-printers-repository'
import { SavePrinterUseCase } from '@/use-cases/printers/save'

export function makeSavePrinterUseCase() {
  const printersRepository = new PrismaPrintersRepository()
  const devicesRepository = new PrismaDevicesRepository()
  const saveUseCase = new SavePrinterUseCase(devicesRepository, printersRepository)
  return saveUseCase
}
