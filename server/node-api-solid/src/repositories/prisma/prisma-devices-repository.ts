import { prisma } from '@/lib/prisma'
import { DevicesRepository } from '../devices-repository'

export class PrismaDevicesRepository implements DevicesRepository {
  async findById(device_id: string): Promise<Device | null> {
    const device = await prisma.device.findUnique({
      where: {
        id: device_id,
      },
    })

    return device
  }

  async create(data: DeviceCreateInput): Promise<Device> {
    const device = await prisma.device.create({
      data: {
        name: data.name,
        status: data.status,
        type: data.type,
        acquisition_type: data.acquisition_type,
        description: data.description,
      },
    })

    return device
  }
}
