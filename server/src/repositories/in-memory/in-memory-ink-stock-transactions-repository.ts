import { randomUUID } from 'crypto'
import { InkStockTransactionsRepository } from '../printer-ink-stock-transactions-repository'

export class InMemoryInkStockTransactionsRepository implements InkStockTransactionsRepository {
  public items: InkStockTransactionSchema[] = []

  async create(data: InkStockTransactionCreateInput): Promise<InkStockTransaction> {
    const transaction: InkStockTransactionSchema = {
      id: randomUUID(),
      type: data.type,
      ink_id: data.inkId,
      operator: data.operator,
      created_at: new Date(),
    }

    this.items.push(transaction)

    const { id, operator, type, created_at: createdAt, ink_id } = transaction
    const stockTransaction = { id, operator, type, createdAt, ink: { id: ink_id, name: '' } }

    return stockTransaction
  }

  async findMany(): Promise<InkStockTransaction[]> {
    const transactions = this.items.map((transaction) => {
      const { id, operator, type, created_at: createdAt, ink_id } = transaction
      return { id, operator, type, createdAt, ink: { id: ink_id, name: '' } }
    })

    return transactions
  }

  async findManyByInk(inkId: string): Promise<InkStockTransaction[]> {
    const transactions = this.items
      .filter((transaction) => transaction.ink_id === inkId)
      .map((transaction) => {
        const { id, operator, type, created_at: createdAt, ink_id } = transaction
        return { id, operator, type, createdAt, ink: { id: ink_id, name: '' } }
      })

    return transactions
  }
}
