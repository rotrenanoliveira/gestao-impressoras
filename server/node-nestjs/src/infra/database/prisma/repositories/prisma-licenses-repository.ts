import { Injectable } from '@nestjs/common'

import { LicensesRepository } from '@/domain/it-manager/application/repositories/licenses-repository'
import { License } from '@/domain/it-manager/enterprise/entities/license'

@Injectable()
export class PrismaLicensesRepository implements LicensesRepository {
  findById(licenseId: string): Promise<License | null> {
    throw new Error('Method not implemented.')
  }

  findMany(): Promise<License[]> {
    throw new Error('Method not implemented.')
  }

  findManyCloseToExpire(): Promise<License[]> {
    throw new Error('Method not implemented.')
  }

  create(license: License): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(license: License): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(licenseId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
