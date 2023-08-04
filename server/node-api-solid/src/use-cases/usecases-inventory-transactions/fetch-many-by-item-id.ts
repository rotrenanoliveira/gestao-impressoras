import { InventoryTransactionsRepository } from '@/repositories/inventory-transactions-repository'

interface UseCaseResponse {
  transactions: InventoryTransaction[]
}

export class FetchManyInventoryTransactionsByItemUseCase {
  constructor(private inventoryTransactionsRepository: InventoryTransactionsRepository) {}

  async execute({ itemId }: { itemId: string }): Promise<UseCaseResponse> {
    const transactions = await this.inventoryTransactionsRepository.findManyByItemId(itemId)

    return {
      transactions,
    }
  }
}
