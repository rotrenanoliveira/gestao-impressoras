import { Injectable } from '@nestjs/common'

import { MobileDevicesRepository } from '@/domain/it-manager/application/repositories/mobile-devices-repository'
import { MobileDevice } from '@/domain/it-manager/enterprise/entities/mobile-device'

import { PrismaMobileDeviceMapper } from '../mappers/prisma-mobile-device-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaMobileDevicesRepository implements MobileDevicesRepository {
  constructor(private prisma: PrismaService) {}

  async findById(mobileDeviceId: string): Promise<MobileDevice | null> {
    const device = await this.prisma.mobileDevice.findUnique({
      where: {
        id: mobileDeviceId,
      },
    })

    if (!device) {
      return null
    }

    return PrismaMobileDeviceMapper.toDomain(device)
  }

  async findMany(): Promise<MobileDevice[]> {
    const devices = await this.prisma.mobileDevice.findMany()

    return devices.map(PrismaMobileDeviceMapper.toDomain)
  }

  async create(mobileDevice: MobileDevice): Promise<void> {
    const data = PrismaMobileDeviceMapper.toPersistence(mobileDevice)

    await this.prisma.mobileDevice.create({
      data,
    })
  }

  async save(mobileDevice: MobileDevice): Promise<void> {
    const data = PrismaMobileDeviceMapper.toPersistence(mobileDevice)

    await this.prisma.mobileDevice.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(mobileDevice: MobileDevice): Promise<void> {
    const data = PrismaMobileDeviceMapper.toPersistence(mobileDevice)

    await this.prisma.mobileDevice.delete({
      where: {
        id: data.id,
      },
    })
  }
}
