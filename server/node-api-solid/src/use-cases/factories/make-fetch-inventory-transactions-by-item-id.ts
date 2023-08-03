import { PrismaInventoryTransactionsRepository } from '@/repositories/prisma/prisma-inventory-transactions-repository'
import { FetchInventoryTransactionsByItemIdUseCase } from '../fetch-inventory-transactions-by-item-id'

export function makeFetchInventoryTransactionsByItemId() {
  const inventoryRepository = new PrismaInventoryTransactionsRepository()
  const useCase = new FetchInventoryTransactionsByItemIdUseCase(inventoryRepository)

  return useCase
}
