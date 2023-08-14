import { InventoryRepository } from '@/repositories/inventory-repository'

export class FetchManyInventoryItemsByDeviceUseCase {
  constructor(private inventoryRepository: InventoryRepository) {}

  async execute(deviceId: string): Promise<{ items: InventoryItem[] }> {
    const items = await this.inventoryRepository.findManyByDeviceId(deviceId)

    return { items }
  }
}
