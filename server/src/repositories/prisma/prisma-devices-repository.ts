import { prisma } from '@/lib/prisma'
import { DevicesRepository } from '../devices-repository'

function hydrateData(rawData: Partial<Device>) {
  const data: Partial<DeviceSchema> = {}

  for (const key in rawData) {
    switch (key) {
      case 'name':
        data.name = rawData[key]
        break

      case 'department':
        data.department = rawData[key]
        break

      case 'status':
        data.status = rawData[key]
        break

      default:
        break
    }
  }

  return data
}

export class PrismaDevicesRepository implements DevicesRepository {
  private select = {
    id: true,
    name: true,
    status: true,
    department: true,
  }

  async create(data: DeviceCreateInput): Promise<Device> {
    const device = await prisma.device.create({
      data: {
        name: data.name,
        department: data.department,
        status: 'ok',
      },
      select: { ...this.select },
    })

    return device
  }

  async findById(deviceId: string): Promise<Device | null> {
    const device = await prisma.device.findUnique({
      where: { id: deviceId },
      select: { ...this.select },
    })

    return device
  }

  async save(deviceId: string, rawData: Partial<Device>): Promise<Device> {
    const data = hydrateData(rawData)

    const device = await prisma.device.update({
      where: { id: deviceId },
      data: { ...data },
      select: { ...this.select },
    })

    return device
  }

  async remove(deviceId: string): Promise<Device> {
    const device = await prisma.device.delete({
      where: { id: deviceId },
      select: { ...this.select },
    })

    return device
  }
}
