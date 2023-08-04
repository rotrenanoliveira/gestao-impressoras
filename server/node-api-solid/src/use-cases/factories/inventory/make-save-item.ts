import { PrismaInventoryRepository } from '@/repositories/prisma/prisma-inventory-repository'
import { SaveInventoryItemUseCase } from '@/use-cases/usecases-inventory/save-item'

export function makeSaveItem() {
  const inventoryRepository = new PrismaInventoryRepository()
  const useCase = new SaveInventoryItemUseCase(inventoryRepository)

  return useCase
}
