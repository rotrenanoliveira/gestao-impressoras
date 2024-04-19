import { Injectable } from '@nestjs/common'

import { UserLicensesRepository } from '@/domain/it-manager/application/repositories/user-licenses-repository'
import { FetchUserLicensesUseCase } from '@/domain/it-manager/application/use-cases/user-license/fetch-user-licenses'

@Injectable()
export class FetchUserLicensesUseCaseAdapter extends FetchUserLicensesUseCase {
  constructor(userLicensesRepository: UserLicensesRepository) {
    super(userLicensesRepository)
  }
}
