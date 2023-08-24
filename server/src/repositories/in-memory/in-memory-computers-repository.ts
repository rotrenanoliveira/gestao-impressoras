import { randomUUID } from 'node:crypto'
import { ComputersRepository } from '../computers-repository'

function hydrateData(rawData: Partial<Computer>) {
  const data: Partial<ComputerSchema> = {}

  for (const key in rawData) {
    switch (key) {
      case 'specs':
        data.specs = rawData[key]
        break

      case 'usedBy':
        data.used_by = rawData[key]
        break

      default:
        break
    }
  }

  return data
}

export class InMemoryComputersRepository implements ComputersRepository {
  public items: ComputerSchema[] = []

  async findMany(): Promise<Computer[]> {
    const computers = this.items.map((pc) => {
      const { device_id: deviceId, used_by: usedBy, id, specs } = pc
      return { id, specs, usedBy, deviceId, name: '', status: 'ok' as DeviceStatus }
    })

    return computers
  }

  async findById(computerId: string): Promise<Computer | null> {
    const pc = this.items.find((pc) => pc.id === computerId)

    if (!pc) {
      return null
    }

    const { device_id: deviceId, used_by: usedBy, id, specs } = pc
    const computer = { id, specs, usedBy, deviceId, name: '', status: 'ok' as DeviceStatus }

    return computer
  }

  async create(data: ComputerCreateInput): Promise<Computer> {
    const pc: ComputerSchema = {
      id: randomUUID(),
      device_id: data.deviceId,
      specs: data.specs,
      used_by: data.usedBy,
    }

    this.items.push(pc)

    const { device_id: deviceId, used_by: usedBy, id, specs } = pc
    const computer = { id, specs, usedBy, deviceId, name: '', status: 'ok' as DeviceStatus }

    return computer
  }

  async save(computerId: string, rawData: ComputerSaveInput): Promise<Computer | null> {
    const computerIndex = this.items.findIndex((pc) => pc.id === computerId)

    if (computerIndex < 0) {
      return null
    }

    const data = hydrateData(rawData)

    this.items[computerIndex] = {
      ...this.items[computerIndex],
      ...data,
    }

    const { device_id: deviceId, used_by: usedBy, id, specs } = this.items[computerIndex]
    const computer = { id, specs, usedBy, deviceId, name: '', status: '' as DeviceStatus }

    return computer
  }

  async remove(computerId: string): Promise<Computer | null> {
    const computerIndex = this.items.findIndex((pc) => pc.id === computerId)

    if (computerIndex < 0) {
      return null
    }

    const { device_id: deviceId, used_by: usedBy, id, specs } = this.items[computerIndex]
    const computer = { id, specs, usedBy, deviceId, name: '', status: '' as DeviceStatus }
    this.items.splice(computerIndex, 1)

    return computer
  }
}
