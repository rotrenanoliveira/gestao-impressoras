import { InventoryRepository } from '@/repositories/inventory-repository'
import { ResourceNotFound } from '../errors/resource-not-found'

export class GetInventoryItemByIdUseCase {
  constructor(private inventoryRepository: InventoryRepository) {}

  async execute(itemId: string): Promise<{ item: InventoryItem }> {
    const item = await this.inventoryRepository.findById(itemId)

    if (!item) {
      throw new ResourceNotFound('inventory item')
    }

    return { item }
  }
}
