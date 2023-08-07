import { InventoryTransactionsRepository } from '@/repositories/inventory-transactions-repository'

export class FetchAllInventoryTransactionsUseCase {
  constructor(private inventoryTransactionsRepository: InventoryTransactionsRepository) {}

  async execute(): Promise<{ transactions: InventoryTransaction[] }> {
    const transactions = await this.inventoryTransactionsRepository.findMany()

    return { transactions }
  }
}
