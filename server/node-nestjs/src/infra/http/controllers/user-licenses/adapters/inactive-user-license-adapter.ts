import { Injectable } from '@nestjs/common'

import { UserLicensesRepository } from '@/domain/it-manager/application/repositories/user-licenses-repository'
import { InactiveUserLicenseUseCase } from '@/domain/it-manager/application/use-cases/user-license/inactive-user-license'

@Injectable()
export class InactiveUserLicenseUseCaseAdapter extends InactiveUserLicenseUseCase {
  constructor(userLicensesRepository: UserLicensesRepository) {
    super(userLicensesRepository)
  }
}
