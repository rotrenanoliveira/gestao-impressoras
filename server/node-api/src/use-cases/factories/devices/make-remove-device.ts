import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'
import { RemoveDeviceUseCase } from '@/use-cases/usecases-devices/remove'

export function makeRemoveDevice() {
  const devicesRepository = new PrismaDevicesRepository()
  const useCase = new RemoveDeviceUseCase(devicesRepository)

  return useCase
}
