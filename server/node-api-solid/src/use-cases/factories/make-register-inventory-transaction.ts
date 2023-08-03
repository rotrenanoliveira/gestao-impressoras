import { PrismaInventoryTransactionsRepository } from '@/repositories/prisma/prisma-inventory-transactions-repository'
import { PrismaInventoryRepository } from '@/repositories/prisma/prisma-inventory-repository'
import { RegisterInventoryTransactionUseCase } from '../register-inventory-transaction'

export function makeRegisterInventoryTransaction() {
  const inventoryRepository = new PrismaInventoryRepository()
  const inventoryTransactionsRepository = new PrismaInventoryTransactionsRepository()

  const useCase = new RegisterInventoryTransactionUseCase(inventoryRepository, inventoryTransactionsRepository)
  return useCase
}
