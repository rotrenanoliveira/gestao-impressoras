import { PrismaInkStockTransactionsRepository } from '@/repositories/prisma/prisma-ink-stock-transactions-repository'
import { FetchManyInkStockTransactionsUseCase } from '@/use-cases/ink-stock-transactions/fetch-many'

export function makeFetchManyInkStockTransactions() {
  const inkStockTransactionsRepository = new PrismaInkStockTransactionsRepository()
  const fetchUseCase = new FetchManyInkStockTransactionsUseCase(inkStockTransactionsRepository)
  return fetchUseCase
}
