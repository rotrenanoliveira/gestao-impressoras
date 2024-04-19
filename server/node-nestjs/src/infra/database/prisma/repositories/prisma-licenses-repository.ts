import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'

import { LicensesRepository } from '@/domain/it-manager/application/repositories/licenses-repository'
import { License } from '@/domain/it-manager/enterprise/entities/license'

import { PrismaLicenseMapper } from '../mappers/prisma-license-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaLicensesRepository implements LicensesRepository {
  constructor(private prisma: PrismaService) {}

  async findById(licenseId: string): Promise<License | null> {
    const license = await this.prisma.license.findUnique({
      where: {
        id: licenseId,
      },
    })

    if (!license) {
      return null
    }

    return PrismaLicenseMapper.toDomain(license)
  }

  async findMany(): Promise<License[]> {
    const licenses = await this.prisma.license.findMany()

    return licenses.map(PrismaLicenseMapper.toDomain)
  }

  async findManyCloseToExpire(): Promise<License[]> {
    const THIRTY_DAYS_TO_EXPIRE = dayjs().add(30, 'days').toDate()

    const licenses = await this.prisma.license.findMany({
      where: {
        expiresAt: {
          lte: THIRTY_DAYS_TO_EXPIRE,
        },
      },
    })

    return licenses.map(PrismaLicenseMapper.toDomain)
  }

  async create(license: License): Promise<void> {
    const data = PrismaLicenseMapper.toPersistence(license)

    await this.prisma.license.create({
      data,
    })
  }

  async save(license: License): Promise<void> {
    const data = PrismaLicenseMapper.toPersistence(license)

    await this.prisma.license.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(license: License): Promise<void> {
    const data = PrismaLicenseMapper.toPersistence(license)

    await this.prisma.license.delete({
      where: {
        id: data.id,
      },
    })
  }
}
