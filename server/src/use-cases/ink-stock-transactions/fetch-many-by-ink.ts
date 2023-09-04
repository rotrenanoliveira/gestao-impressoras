import { InkStockTransactionsRepository } from '@/repositories/printer-ink-stock-transactions-repository'

export class FetchManyInkStockTransactionsByInkUseCase {
  constructor(private inkStockTransactionsRepository: InkStockTransactionsRepository) {}

  async execute(inkId: string): Promise<{ transactions: InkStockTransaction[] }> {
    const stockTransaction = await this.inkStockTransactionsRepository.findManyByInk(inkId)

    return {
      transactions: stockTransaction,
    }
  }
}
