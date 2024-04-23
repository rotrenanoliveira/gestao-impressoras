import { License as PrismaLicense, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { License, LicenseCost } from '@/domain/it-manager/enterprise/entities/license'

export class PrismaLicenseMapper {
  static toDomain(raw: PrismaLicense): License {
    const licenseCost: LicenseCost = JSON.parse(raw.cost)

    return License.create(
      {
        name: raw.name,
        quantity: raw.quantity,
        partner: raw.partner,
        expiresAt: raw.expiresAt,
        cost: licenseCost,
        obs: raw.obs,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(license: License): Prisma.LicenseUncheckedCreateInput {
    const licenseCost = JSON.stringify(license.cost)

    return {
      id: license.id.toString(),
      name: license.name,
      quantity: license.quantity,
      partner: license.partner,
      expiresAt: license.expiresAt,
      cost: licenseCost,
      obs: license.obs,
      createdAt: license.createdAt,
    }
  }
}
