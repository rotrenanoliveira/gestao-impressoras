import { randomUUID } from 'node:crypto'
import { DevicesRepository } from '../devices-repository'

export class InMemoryDevicesRepository implements DevicesRepository {
  public items: Device[] = []

  async findById(device_id: string): Promise<Device | null> {
    const device = this.items.find((item) => item.id === device_id)

    if (!device) {
      return null
    }

    return device
  }

  async create(data: DeviceCreateInput): Promise<Device> {
    const device: Device = {
      id: randomUUID(),
      name: data.name,
      type: data.type,
      status: data.status,
      description: data.description,
      acquisition_type: data.acquisition_type,
      created_at: new Date(),
    }

    this.items.push(device)

    return device
  }
}
