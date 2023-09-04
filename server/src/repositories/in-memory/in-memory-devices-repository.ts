import { randomUUID } from 'node:crypto'
import { DevicesRepository } from '../devices-repository'
import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'

function getHydratedData(rawData: Partial<Device>) {
  const data: Partial<Device> = {}

  for (const key in rawData) {
    switch (key) {
      case 'status':
        data.status = rawData[key]
        break

      case 'department':
        data.department = rawData[key]
        break

      case 'name':
        data.name = rawData[key]
        break

      default:
        break
    }
  }

  return data
}

export class InMemoryDevicesRepository implements DevicesRepository {
  public items: Device[] = []

  async findById(deviceId: string): Promise<Device | null> {
    const device = this.items.find((device) => device.id === deviceId)

    if (!device) {
      return null
    }

    return device
  }

  async create(data: DeviceCreateInput): Promise<Device> {
    const device: Device = {
      id: randomUUID(),
      status: 'ok',
      name: data.name,
      department: data.department,
    }

    this.items.push(device)

    return device
  }

  async save(deviceId: string, rawData: Partial<Device>): Promise<Device> {
    const deviceIndex = this.items.findIndex((device) => device.id === deviceId)

    if (deviceIndex < 0) {
      throw new ResourceNotFound('device')
    }

    const data = getHydratedData(rawData)
    const currentDevice = this.items[deviceIndex]

    this.items[deviceIndex] = {
      ...currentDevice,
      ...data,
    }

    return this.items[deviceIndex]
  }

  async remove(deviceId: string): Promise<Device> {
    const deviceIndex = this.items.findIndex((device) => device.id === deviceId)

    if (deviceIndex < 0) {
      throw new ResourceNotFound('device')
    }

    const device = this.items[deviceIndex]
    this.items.splice(deviceIndex, 1)

    return device
  }
}
