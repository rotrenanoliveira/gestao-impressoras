import { randomUUID } from 'node:crypto'
import { InventoryTransactionsRepository } from '../inventory-transactions-repository'

export class InMemoryInventoryTransactionsRepository implements InventoryTransactionsRepository {
  public items: InventoryTransactionData[] = []

  async findManyByItemId(item_id: string): Promise<InventoryTransaction[]> {
    const transactions = this.items
      .filter((item) => item.item_id === item_id)
      .map((item) => {
        return {
          ...item,
          title: '',
        }
      })

    return transactions
  }

  async create(data: InventoryTransactionCreateInput): Promise<void> {
    const item = {
      id: randomUUID(),
      item_id: data.item_id,
      operator: data.operator,
      quantity: data.quantity,
      transaction_type: data.transaction_type,
      created_at: new Date(),
    }

    this.items.push(item)
  }
}
