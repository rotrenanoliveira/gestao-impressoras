import { PrismaComputersRepository } from '@/repositories/prisma/prisma-computers-repository'
import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'
import { RemoveComputerUseCase } from '@/use-cases/computers/remove'

export function makeRemoveComputerUseCase() {
  const computersRepository = new PrismaComputersRepository()
  const devicesRepository = new PrismaDevicesRepository()
  const removeUseCase = new RemoveComputerUseCase(devicesRepository, computersRepository)
  return removeUseCase
}
