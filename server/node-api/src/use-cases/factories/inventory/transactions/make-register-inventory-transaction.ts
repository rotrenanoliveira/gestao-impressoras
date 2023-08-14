import { PrismaInventoryRepository } from '@/repositories/prisma/prisma-inventory-repository'
import { PrismaInventoryTransactionsRepository } from '@/repositories/prisma/prisma-inventory-transactions-repository'
import { RegisterInventoryTransactionUseCase } from '@/use-cases/usecases-inventory/transactions/register-inventory-transaction'

export function makeRegisterInventoryTransaction() {
  const inventoryRepository = new PrismaInventoryRepository()
  const inventoryTransactionsRepository = new PrismaInventoryTransactionsRepository()

  const useCase = new RegisterInventoryTransactionUseCase(inventoryRepository, inventoryTransactionsRepository)
  return useCase
}
