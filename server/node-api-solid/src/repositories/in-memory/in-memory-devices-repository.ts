import { randomUUID } from 'node:crypto'
import { DevicesRepository } from '../devices-repository'

export class InMemoryDevicesRepository implements DevicesRepository {
  public items: Device[] = []

  async findMany(): Promise<Device[]> {
    return this.items
  }

  async findManyByType(type: string): Promise<Device[]> {
    return this.items.filter((item) => item.type === type)
  }

  async findById(deviceId: string): Promise<Device | null> {
    const device = this.items.find((item) => item.id === deviceId)

    if (!device) {
      return null
    }

    return device
  }

  async create(data: DeviceCreateInput): Promise<Device> {
    const device: Device = {
      id: randomUUID(),
      created_at: new Date(),
      // NOT NULL
      name: data.name,
      type: data.type,
      supplier: data.supplier,
      status: data.status,
      // RENTED DEVICE PROPS
      acquisition_type: data.acquisition_type,
      rented_in: data.rented_in ?? null,
      contract_expiration: data.contract_expiration ?? null,
      // NULLABLE
      description: data.description ?? null,
      obs: data.obs ?? null,
    }

    this.items.push(device)

    return device
  }

  async save(deviceId: string, data: Partial<Device>): Promise<Device | null> {
    const deviceIndex = this.items.findIndex((item) => item.id === deviceId)

    if (deviceIndex < 0) {
      return null
    }

    const updatedDevice = {
      ...this.items[deviceIndex],
      ...data,
    }

    this.items[deviceIndex] = updatedDevice

    return updatedDevice
  }

  async remove(deviceId: string): Promise<Device | null> {
    const deviceIndex = this.items.findIndex((item) => item.id === deviceId)

    if (deviceIndex < 0) {
      return null
    }

    const device = this.items[deviceIndex]

    this.items.splice(deviceIndex, 1)

    return device
  }
}
