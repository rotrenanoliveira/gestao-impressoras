import { PrismaInventoryTransactionsRepository } from '@/repositories/prisma/prisma-inventory-transactions-repository'
import { FetchInventoryTransactionsByItemIdUseCase } from '../usecases-inventory-transactions/fetch-many-by-item-id'

export function makeFetchInventoryTransactionsByItemId() {
  const inventoryRepository = new PrismaInventoryTransactionsRepository()
  const useCase = new FetchInventoryTransactionsByItemIdUseCase(inventoryRepository)

  return useCase
}
