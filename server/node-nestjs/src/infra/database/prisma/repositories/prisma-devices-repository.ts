import { Injectable } from '@nestjs/common'

import { DevicesRepository } from '@/domain/it-manager/application/repositories/devices-repository'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

import { PrismaDeviceMapper } from '../mappers/prisma-device-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaDevicesRepository implements DevicesRepository {
  constructor(private prisma: PrismaService) {}

  async findById(deviceId: string): Promise<Device<DeviceProps> | null> {
    const device = await this.prisma.device.findUnique({
      where: {
        id: deviceId,
      },
    })

    if (!device) {
      return null
    }

    return PrismaDeviceMapper.toDomain(device)
  }

  async findMany(): Promise<Device<DeviceProps>[]> {
    const devices = await this.prisma.device.findMany()

    return devices.map(PrismaDeviceMapper.toDomain)
  }

  async create(device: Device<DeviceProps>): Promise<void> {
    const data = PrismaDeviceMapper.toPersistence(device)

    await this.prisma.device.create({
      data,
    })
  }

  async save(device: Device<DeviceProps>): Promise<void> {
    const data = PrismaDeviceMapper.toPersistence(device)

    await this.prisma.device.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(device: Device<DeviceProps>): Promise<void> {
    const data = PrismaDeviceMapper.toPersistence(device)

    await this.prisma.device.delete({
      where: {
        id: data.id,
      },
    })
  }
}
