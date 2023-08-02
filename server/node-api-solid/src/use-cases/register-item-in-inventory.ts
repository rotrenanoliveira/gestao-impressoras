import { DevicesRepository } from '@/repositories/devices-repository'
import { InventoryRepository } from '@/repositories/inventory-repository'
import { ResourceNotFound } from './errors/resource-not-found'

export class RegisterItemInInventoryUseCase {
  constructor(
    private inventoryRepository: InventoryRepository,
    private devicesRepository: DevicesRepository,
  ) {}

  async execute({ device_id, title, location, quantity, description }: ItemCreateInput): Promise<void> {
    if (device_id) {
      const device = await this.devicesRepository.findById(device_id)

      if (!device) {
        throw new ResourceNotFound('device')
      }
    }

    await this.inventoryRepository.create({
      title,
      quantity,
      location,
      device_id,
      description,
    })
  }
}
