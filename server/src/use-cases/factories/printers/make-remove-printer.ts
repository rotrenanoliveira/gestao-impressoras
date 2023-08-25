import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'
import { PrismaPrintersRepository } from '@/repositories/prisma/prisma-printers-repository'
import { RemovePrinterUseCase } from '@/use-cases/printers/remove'

export function makeRemovePrinterUseCase() {
  const printersRepository = new PrismaPrintersRepository()
  const devicesRepository = new PrismaDevicesRepository()
  const removeUseCase = new RemovePrinterUseCase(devicesRepository, printersRepository)
  return removeUseCase
}
