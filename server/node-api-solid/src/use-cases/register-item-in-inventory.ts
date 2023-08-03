import { DevicesRepository } from '@/repositories/devices-repository'
import { InventoryRepository } from '@/repositories/inventory-repository'
import { ResourceNotFound } from './errors/resource-not-found'

interface UseCaseResponse {
  item: Item
}

export class RegisterItemInInventoryUseCase {
  constructor(
    private inventoryRepository: InventoryRepository,
    private devicesRepository: DevicesRepository,
  ) {}

  async execute({ device_id, title, location, quantity, description }: ItemCreateInput): Promise<UseCaseResponse> {
    if (device_id) {
      const device = await this.devicesRepository.findById(device_id)

      if (!device) {
        throw new ResourceNotFound('device')
      }
    }

    const item = await this.inventoryRepository.create({
      title,
      quantity,
      location,
      device_id,
      description,
    })

    return { item }
  }
}
