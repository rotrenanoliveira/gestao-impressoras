import { Injectable } from '@nestjs/common'

import { UserLicensesRepository } from '@/domain/it-manager/application/repositories/user-licenses-repository'
import { UserLicense } from '@/domain/it-manager/enterprise/entities/user-license'

@Injectable()
export class PrismaUserLicensesRepository implements UserLicensesRepository {
  findMany(): Promise<UserLicense[]> {
    throw new Error('Method not implemented.')
  }

  findById(userLicenseId: string): Promise<UserLicense | null> {
    throw new Error('Method not implemented.')
  }

  create(userLicense: UserLicense): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(userLicense: UserLicense): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(userLicenseId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
