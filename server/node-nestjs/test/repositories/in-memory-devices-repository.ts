import { DevicesRepository } from '@/domain/it-manager/application/repositories/devices-repository'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

export class InMemoryDevicesRepository implements DevicesRepository {
  public items: Device<DeviceProps>[] = []

  async findById(deviceId: string): Promise<Device<DeviceProps> | null> {
    const device = this.items.find((item) => item.id.toString() === deviceId)

    return device ?? null
  }

  async findMany(): Promise<Device<DeviceProps>[]> {
    const devices = this.items

    return devices
  }

  async create(device: Device<DeviceProps>): Promise<void> {
    this.items.push(device)
  }

  async save(device: Device<DeviceProps>): Promise<void> {
    const deviceIndex = this.items.findIndex((item) => item.equals(device))

    this.items[deviceIndex] = device
  }

  async delete(device: Device<DeviceProps>): Promise<void> {
    const deviceIndex = this.items.findIndex((item) => item.equals(device))

    this.items.splice(deviceIndex, 1)
  }
}
