import { PrismaComputersRepository } from '@/repositories/prisma/prisma-computers-repository'
import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'
import { SaveComputerUseCase } from '@/use-cases/computers/save'

export function makeSaveComputerUseCase() {
  const computersRepository = new PrismaComputersRepository()
  const devicesRepository = new PrismaDevicesRepository()
  const saveUseCase = new SaveComputerUseCase(devicesRepository, computersRepository)
  return saveUseCase
}
