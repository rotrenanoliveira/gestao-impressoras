import { PrismaInventoryTransactionsRepository } from '@/repositories/prisma/prisma-inventory-transactions-repository'
import { FetchAllInventoryTransactionsUseCase } from '@/use-cases/usecases-inventory/transactions/fetch-all'

export function makeFetchAllInventoryTransactions() {
  const inventoryRepository = new PrismaInventoryTransactionsRepository()
  const useCase = new FetchAllInventoryTransactionsUseCase(inventoryRepository)

  return useCase
}
