import { PrismaComputersRepository } from '@/repositories/prisma/prisma-computers-repository'
import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'
import { RegisterComputerUseCase } from '@/use-cases/computers/register'

export function makeRegisterComputerUseCase() {
  const computersRepository = new PrismaComputersRepository()
  const devicesRepository = new PrismaDevicesRepository()
  const registerUseCase = new RegisterComputerUseCase(devicesRepository, computersRepository)
  return registerUseCase
}
