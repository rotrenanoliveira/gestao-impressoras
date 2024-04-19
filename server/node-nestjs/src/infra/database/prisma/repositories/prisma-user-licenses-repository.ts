import { Injectable } from '@nestjs/common'

import { UserLicensesRepository } from '@/domain/it-manager/application/repositories/user-licenses-repository'
import { UserLicense } from '@/domain/it-manager/enterprise/entities/user-license'

import { PrismaUserLicensesMapper } from '../mappers/prisma-user-license-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaUserLicensesRepository implements UserLicensesRepository {
  constructor(private prisma: PrismaService) {}

  async findById(userLicenseId: string): Promise<UserLicense | null> {
    const userLicense = await this.prisma.userLicense.findUnique({
      where: {
        id: userLicenseId,
      },
    })

    if (!userLicense) {
      return null
    }

    return PrismaUserLicensesMapper.toDomain(userLicense)
  }

  async findMany(): Promise<UserLicense[]> {
    const userLicenses = await this.prisma.userLicense.findMany()

    return userLicenses.map(PrismaUserLicensesMapper.toDomain)
  }

  async create(userLicense: UserLicense): Promise<void> {
    const data = PrismaUserLicensesMapper.toPersistence(userLicense)

    await this.prisma.userLicense.create({
      data,
    })
  }

  async save(userLicense: UserLicense): Promise<void> {
    const data = PrismaUserLicensesMapper.toPersistence(userLicense)

    await this.prisma.userLicense.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(userLicense: UserLicense): Promise<void> {
    const data = PrismaUserLicensesMapper.toPersistence(userLicense)

    await this.prisma.userLicense.delete({
      where: {
        id: data.id,
      },
    })
  }
}
