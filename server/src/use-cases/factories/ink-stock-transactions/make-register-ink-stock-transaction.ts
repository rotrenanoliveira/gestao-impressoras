import { PrismaInkStockTransactionsRepository } from '@/repositories/prisma/prisma-ink-stock-transactions-repository'
import { PrismaPrinterInkStockRepository } from '@/repositories/prisma/prisma-printer-ink-stock-repository'
import { RegisterInkStockTransactionUseCase } from '@/use-cases/ink-stock-transactions/register'

export function makeRegisterStockTransaction() {
  const inkStockTransactionsRepository = new PrismaInkStockTransactionsRepository()
  const printerInkStockRepository = new PrismaPrinterInkStockRepository()
  const registerUseCase = new RegisterInkStockTransactionUseCase(
    inkStockTransactionsRepository,
    printerInkStockRepository,
  )
  return registerUseCase
}
