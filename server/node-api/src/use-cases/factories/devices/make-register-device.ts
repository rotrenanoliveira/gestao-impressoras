import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'
import { RegisterDeviceUseCase } from '@/use-cases/usecases-devices/register'

export function makeRegisterDevice() {
  const devicesRepository = new PrismaDevicesRepository()
  const useCase = new RegisterDeviceUseCase(devicesRepository)

  return useCase
}
