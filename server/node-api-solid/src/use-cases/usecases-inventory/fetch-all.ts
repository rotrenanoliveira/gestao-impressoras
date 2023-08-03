import { InventoryRepository } from '@/repositories/inventory-repository'

export class FetchAllInventoryItemsUseCase {
  constructor(private inventoryRepository: InventoryRepository) {}

  async execute(): Promise<{ items: InventoryItem[] }> {
    const items = await this.inventoryRepository.findMany()

    return { items }
  }
}
