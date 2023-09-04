import { InkStockTransactionsRepository } from '@/repositories/printer-ink-stock-transactions-repository'

export class FetchManyInkStockTransactionsUseCase {
  constructor(private inkStockTransactionsRepository: InkStockTransactionsRepository) {}

  async execute(): Promise<{ transactions: InkStockTransaction[] }> {
    const stockTransaction = await this.inkStockTransactionsRepository.findMany()

    return {
      transactions: stockTransaction,
    }
  }
}
