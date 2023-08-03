import { DevicesRepository } from '@/repositories/devices-repository'
import { InventoryRepository } from '@/repositories/inventory-repository'
import { ResourceNotFound } from '../errors/resource-not-found'

export class RegisterItemInInventoryUseCase {
  constructor(
    private inventoryRepository: InventoryRepository,
    private devicesRepository: DevicesRepository,
  ) {}

  async execute({
    deviceId,
    title,
    location,
    quantity,
    description,
  }: InventoryItemCreateInput): Promise<{ item: InventoryItem }> {
    if (deviceId) {
      const device = await this.devicesRepository.findById(deviceId)

      if (!device) {
        throw new ResourceNotFound('device')
      }
    }

    const item = await this.inventoryRepository.create({
      title,
      quantity,
      location,
      deviceId,
      description,
    })

    return { item }
  }
}
