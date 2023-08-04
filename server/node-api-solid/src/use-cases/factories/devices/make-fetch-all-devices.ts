import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'
import { FetchAllDevicesUseCase } from '@/use-cases/usecases-devices/fetch-all'

export function makeFetchAllDevices() {
  const devicesRepository = new PrismaDevicesRepository()
  const useCase = new FetchAllDevicesUseCase(devicesRepository)

  return useCase
}
