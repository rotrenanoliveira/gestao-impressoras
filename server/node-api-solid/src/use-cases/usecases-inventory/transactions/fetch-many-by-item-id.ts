import { InventoryTransactionsRepository } from '@/repositories/inventory-transactions-repository'

export class FetchManyInventoryTransactionsByItemUseCase {
  constructor(private inventoryTransactionsRepository: InventoryTransactionsRepository) {}

  async execute({ itemId }: { itemId: string }): Promise<{ transactions: InventoryTransaction[] }> {
    const transactions = await this.inventoryTransactionsRepository.findManyByItemId(itemId)

    return {
      transactions,
    }
  }
}
