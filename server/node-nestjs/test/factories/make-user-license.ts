import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UserLicense, UserLicenseProps } from '@/domain/it-manager/enterprise/entities/user-license'
import { PrismaUserLicensesMapper } from '@/infra/database/prisma/mappers/prisma-user-license-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeUserLicense(override: Partial<UserLicenseProps> = {}, id?: UniqueEntityID) {
  const userLicense = UserLicense.create(
    {
      userId: new UniqueEntityID(),
      licenseId: new UniqueEntityID(),
      departmentId: null,
      ...override,
    },
    id,
  )

  return userLicense
}

@Injectable()
export class UserLicenseFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaUserLicense(data: Partial<UserLicenseProps> = {}): Promise<UserLicense> {
    const userLicense = makeUserLicense(data)

    await this.prisma.userLicense.create({
      data: PrismaUserLicensesMapper.toPersistence(userLicense),
    })

    return userLicense
  }
}
