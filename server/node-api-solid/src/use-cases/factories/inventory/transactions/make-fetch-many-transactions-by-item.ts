import { PrismaInventoryTransactionsRepository } from '@/repositories/prisma/prisma-inventory-transactions-repository'
import { FetchManyInventoryTransactionsByItemUseCase } from '@/use-cases/usecases-inventory/transactions/fetch-many-by-item-id'

export function makeFetchInventoryTransactionsByItem() {
  const inventoryRepository = new PrismaInventoryTransactionsRepository()
  const useCase = new FetchManyInventoryTransactionsByItemUseCase(inventoryRepository)

  return useCase
}
