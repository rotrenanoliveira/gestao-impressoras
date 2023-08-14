import { PrismaInventoryRepository } from '@/repositories/prisma/prisma-inventory-repository'
import { RemoveInventoryItemUseCase } from '@/use-cases/usecases-inventory/remove-item'

export function makeRemoveItem() {
  const inventoryRepository = new PrismaInventoryRepository()
  const useCase = new RemoveInventoryItemUseCase(inventoryRepository)

  return useCase
}
