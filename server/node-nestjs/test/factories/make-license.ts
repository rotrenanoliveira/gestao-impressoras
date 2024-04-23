import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { License, LicenseProps } from '@/domain/it-manager/enterprise/entities/license'
import { PrismaLicenseMapper } from '@/infra/database/prisma/mappers/prisma-license-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeLicense(override: Partial<LicenseProps> = {}, id?: UniqueEntityID) {
  const license = License.create(
    {
      name: faker.commerce.productName(),
      quantity: faker.number.int({ max: 100 }),
      partner: faker.company.name(),
      expiresAt: faker.date.future(),
      obs: faker.lorem.words(10),
      cost: {
        value: Number(faker.commerce.price()),
        currency: faker.finance.currency().code,
      },
      ...override,
    },
    id,
  )

  return license
}

@Injectable()
export class LicenseFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaLicense(data: Partial<LicenseProps> = {}): Promise<License> {
    const license = makeLicense(data)

    await this.prisma.license.create({
      data: PrismaLicenseMapper.toPersistence(license),
    })

    return license
  }
}
