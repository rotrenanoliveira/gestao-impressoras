import { PrismaInventoryRepository } from '@/repositories/prisma/prisma-inventory-repository'
import { FetchManyInventoryItemsByDeviceUseCase } from '@/use-cases/usecases-inventory/fetch-many-by-device'

export function makeFetchManyInventoryItemsByDevice() {
  const inventoryRepository = new PrismaInventoryRepository()
  const useCase = new FetchManyInventoryItemsByDeviceUseCase(inventoryRepository)

  return useCase
}
