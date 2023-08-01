import { randomUUID } from 'node:crypto'
import { InventoryTransactionsRepository } from '../inventory-transactions-repository'
import { InMemoryInventoryRepository } from './in-memory-inventory-repository'

const inventoryRepository = new InMemoryInventoryRepository()

export class InMemoryInventoryTransactionsRepository implements InventoryTransactionsRepository {
  public items: InventoryTransactionData[] = []

  async findManyByItemId(item_id: string): Promise<InventoryTransaction[]> {
    const transactions = this.items
      .filter((item) => item.item_id === item_id)
      .map((item) => {
        const itemInventory = inventoryRepository.items.find((itemInventory) => itemInventory.id === item.id)

        return {
          ...item,
          title: itemInventory ? itemInventory.title : '',
        }
      })

    return transactions
  }

  async findManyByDeviceId(device_id: string): Promise<InventoryTransaction[]> {
    const itemsInInventoryByDevice = inventoryRepository.items
      .filter((itemInventory) => itemInventory.device_id === device_id)
      .map((item) => {
        return {
          item_id: item.id,
        }
      })

    let transactions: InventoryTransaction[] = []

    for (const itemsInInventory of itemsInInventoryByDevice) {
      const itemTransactions = this.items
        .filter((item) => item.item_id === itemsInInventory.item_id)
        .map((item) => {
          const itemInventory = inventoryRepository.items.find((itemInventory) => itemInventory.id === item.id)

          return {
            ...item,
            title: itemInventory ? itemInventory.title : '',
          }
        })

      transactions = [...transactions, ...itemTransactions]
    }

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
