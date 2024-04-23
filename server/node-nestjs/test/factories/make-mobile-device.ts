import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { MobileDevice, MobileDeviceProps } from '@/domain/it-manager/enterprise/entities/mobile-device'
import { PrismaMobileDeviceMapper } from '@/infra/database/prisma/mappers/prisma-mobile-device-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeMobileDevice(override: Partial<MobileDeviceProps> = {}, id?: UniqueEntityID) {
  const device = {
    contractId: new UniqueEntityID(),
    serialNumber: faker.number.int().toString(),
    model: faker.commerce.productName(),
    invoice: faker.number.int().toString(),
    assetTag: faker.number.int().toString(),
    purchaseDate: faker.date.recent(),
    warrantyEndDate: faker.date.future(),
  }

  const mobileDevice = MobileDevice.create(
    {
      name: faker.commerce.productName(),
      departmentId: new UniqueEntityID(),
      type: 'celular',
      operatingSystem: 'Android',
      serviceCompany: null,
      serviceNumber: null,
      ...device,
      ...override,
    },
    id,
  )

  return mobileDevice
}

@Injectable()
export class MobileDeviceFactory {
  constructor(private prisma: PrismaService) {}

  async makeMobileDevicePrisma(data: Partial<MobileDeviceProps> = {}) {
    const mobileDevice = makeMobileDevice(data)

    await this.prisma.mobileDevice.create({
      data: PrismaMobileDeviceMapper.toPersistence(mobileDevice),
    })

    return mobileDevice
  }
}
