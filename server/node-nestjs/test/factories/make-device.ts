import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'
import { PrismaDeviceMapper } from '@/infra/database/prisma/mappers/prisma-device-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeDevice(override: Partial<DeviceProps> = {}, id?: UniqueEntityID) {
  const device = Device.create(
    {
      contractId: new UniqueEntityID(),
      serialNumber: faker.number.int().toString(),
      model: faker.commerce.productName(),
      invoice: faker.number.int().toString(),
      assetTag: faker.number.int().toString(),
      purchaseDate: faker.date.recent(),
      warrantyEndDate: faker.date.future(),
      ...override,
    },
    id,
  )

  return device
}

@Injectable()
export class DeviceFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaDevice(data: Partial<DeviceProps> = {}) {
    const device = makeDevice(data)

    await this.prisma.device.create({
      data: PrismaDeviceMapper.toPersistence(device),
    })

    return device
  }
}
