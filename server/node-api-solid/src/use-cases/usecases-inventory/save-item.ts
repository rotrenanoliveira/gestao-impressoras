import { InventoryRepository } from '@/repositories/inventory-repository'
import { ResourceNotFound } from '../errors/resource-not-found'
import { InvalidOperationError } from '../errors/invalid-operation'

export class SaveInventoryItemUseCase {
  constructor(private inventoryRepository: InventoryRepository) {}

  async execute(itemId: string, data: Partial<InventoryItem>): Promise<{ item: InventoryItem }> {
    const item = await this.inventoryRepository.save(itemId, { ...data })

    if (data.quantity) {
      throw new InvalidOperationError()
    }

    if (!item) {
      throw new ResourceNotFound('inventorty item')
    }

    return { item }
  }
}
