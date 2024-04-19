import { Injectable } from '@nestjs/common'

import { UserLicensesRepository } from '@/domain/it-manager/application/repositories/user-licenses-repository'
import { ActiveUserLicenseUseCase } from '@/domain/it-manager/application/use-cases/user-license/active-user-license'

@Injectable()
export class ActiveUserLicenseUseCaseAdapter extends ActiveUserLicenseUseCase {
  constructor(userLicensesRepository: UserLicensesRepository) {
    super(userLicensesRepository)
  }
}
