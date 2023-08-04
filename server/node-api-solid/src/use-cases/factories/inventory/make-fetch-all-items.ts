import { PrismaInventoryRepository } from '@/repositories/prisma/prisma-inventory-repository'
import { FetchAllInventoryItemsUseCase } from '@/use-cases/usecases-inventory/fetch-all'

export function makeFetchAllInventoryItems() {
  const inventoryRepository = new PrismaInventoryRepository()
  const useCase = new FetchAllInventoryItemsUseCase(inventoryRepository)

  return useCase
}
