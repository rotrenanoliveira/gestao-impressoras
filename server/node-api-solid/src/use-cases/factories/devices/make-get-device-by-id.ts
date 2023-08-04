import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'
import { GetDeviceByIdUseCase } from '@/use-cases/usecases-devices/get-by-id'

export function makeGetDevice() {
  const devicesRepository = new PrismaDevicesRepository()
  const useCase = new GetDeviceByIdUseCase(devicesRepository)

  return useCase
}
