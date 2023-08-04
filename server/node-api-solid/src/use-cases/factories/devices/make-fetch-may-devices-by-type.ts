import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'
import { FetchManyDevicesByTypeUseCase } from '@/use-cases/usecases-devices/fetch-many-by-type'

export function makeFetchManyDevicesByType() {
  const devicesRepository = new PrismaDevicesRepository()
  const useCase = new FetchManyDevicesByTypeUseCase(devicesRepository)

  return useCase
}
