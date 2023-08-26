import { PrismaInkStockTransactionsRepository } from '@/repositories/prisma/prisma-ink-stock-transactions-repository'
import { FetchManyInkStockTransactionsByInkUseCase } from '@/use-cases/ink-stock-transactions/fetch-many-by-ink'

export function makeFetchManyInkStockTransactionsByInk() {
  const inkStockTransactionsRepository = new PrismaInkStockTransactionsRepository()
  const fetchUseCase = new FetchManyInkStockTransactionsByInkUseCase(inkStockTransactionsRepository)
  return fetchUseCase
}
