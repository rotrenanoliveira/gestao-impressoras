import { InventoryRepository } from '@/repositories/inventory-repository'
import { ResourceNotFound } from '../errors/resource-not-found'

export class RemoveInventoryItemUseCase {
  constructor(private inventoryRepository: InventoryRepository) {}

  async execute(itemId: string): Promise<{ item: InventoryItem }> {
    const item = await this.inventoryRepository.remove(itemId)

    if (!item) {
      throw new ResourceNotFound('inventorty item')
    }

    return { item }
  }
}
