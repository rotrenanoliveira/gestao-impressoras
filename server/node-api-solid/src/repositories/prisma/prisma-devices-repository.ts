import { prisma } from '@/lib/prisma'
import { DevicesRepository } from '../devices-repository'

export class PrismaDevicesRepository implements DevicesRepository {
  async findMany(): Promise<Device[]> {
    const devices = await prisma.device.findMany()

    return devices
  }

  async findManyByType(type: string): Promise<Device[]> {
    const devices = await prisma.device.findMany({
      where: {
        type,
      },
    })

    return devices
  }

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
        type: data.type,
        status: data.status,
        supplier: data.supplier,
        acquisition_type: data.acquisition_type,
        contract_expiration: data.contract_expiration,
        description: data.description,
        rented_in: data.rented_in,
        obs: data.obs,
      },
    })

    return device
  }

  async save(deviceId: string, data: Partial<Device>): Promise<Device | null> {
    const device = await prisma.device.update({
      where: {
        id: deviceId,
      },
      data: {
        ...data,
      },
    })

    return device
  }

  async remove(deviceId: string): Promise<Device | null> {
    const device = await prisma.device.delete({
      where: {
        id: deviceId,
      },
    })

    return device
  }
}
