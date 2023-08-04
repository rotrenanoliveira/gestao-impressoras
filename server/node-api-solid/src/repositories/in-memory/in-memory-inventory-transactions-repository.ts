import { randomUUID } from 'node:crypto'
import { InventoryTransactionsRepository } from '../inventory-transactions-repository'

export class InMemoryInventoryTransactionsRepository implements InventoryTransactionsRepository {
  public items: InventoryTransactionData[] = []

  async findMany(): Promise<InventoryTransaction[]> {
    const transactions = this.items.map((item) => {
      return {
        ...item,
        item: {
          title: '',
        },
      }
    })

    return transactions
  }

  async findManyByItemId(itemId: string): Promise<InventoryTransaction[]> {
    const transactions = this.items
      .filter((item) => item.itemId === itemId)
      .map((item) => {
        return {
          ...item,
          item: {
            title: '',
          },
        }
      })

    return transactions
  }

  async create(data: InventoryTransactionCreateInput): Promise<void> {
    const item = {
      id: randomUUID(),
      itemId: data.itemId,
      operator: data.operator,
      quantity: data.quantity,
      transaction_type: data.transaction_type,
      created_at: new Date(),
    }

    this.items.push(item)
  }
}
