import { PrismaInventoryRepository } from '@/repositories/prisma/prisma-inventory-repository'
import { GetInventoryItemByIdUseCase } from '@/use-cases/usecases-inventory/get-by-id'

export function makeGetInventoryItem() {
  const inventoryRepository = new PrismaInventoryRepository()
  const useCase = new GetInventoryItemByIdUseCase(inventoryRepository)

  return useCase
}
