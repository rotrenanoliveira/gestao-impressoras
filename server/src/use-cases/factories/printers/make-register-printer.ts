import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'
import { PrismaPrintersRepository } from '@/repositories/prisma/prisma-printers-repository'
import { RegisterPrinterUseCase } from '@/use-cases/printers/register'

export function makeRegisterPrinterUseCase() {
  const printersRepository = new PrismaPrintersRepository()
  const devicesRepository = new PrismaDevicesRepository()
  const registerUseCase = new RegisterPrinterUseCase(devicesRepository, printersRepository)
  return registerUseCase
}
