export interface InkStockTransactionsRepository {
  create(data: InkStockTransactionCreateInput): Promise<InkStockTransaction>

  findMany(): Promise<InkStockTransaction[]>
  findManyByInk(inkId: string): Promise<InkStockTransaction[]>
}
