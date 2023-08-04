import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'
import { SaveDeviceUseCase } from '@/use-cases/usecases-devices/save'

export function makeSaveDevice() {
  const devicesRepository = new PrismaDevicesRepository()
  const useCase = new SaveDeviceUseCase(devicesRepository)

  return useCase
}
