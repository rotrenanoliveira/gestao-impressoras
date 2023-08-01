import { InventoryTransactionsRepository } from '@/repositories/inventory-transactions-repository'

interface UseCaseResponse {
  transactions: InventoryTransaction[]
}

export class FetchInventoryTransactionsByItemIdUseCase {
  constructor(private inventoryTransactionsRepository: InventoryTransactionsRepository) {}

  async execute({ item_id }: { item_id: string }): Promise<UseCaseResponse> {
    const transactions = await this.inventoryTransactionsRepository.findManyByItemId(item_id)

    return {
      transactions,
    }
  }
}
