import { Injectable } from '@nestjs/common'

import { LicensesRepository } from '@/domain/it-manager/application/repositories/licenses-repository'
import { FetchLicensesCloseToExpireUseCase } from '@/domain/it-manager/application/use-cases/license/fetch-licenses-close-to-expire'

@Injectable()
export class FetchLicensesCloseToExpireUseCaseAdapter extends FetchLicensesCloseToExpireUseCase {
  constructor(licensesRepository: LicensesRepository) {
    super(licensesRepository)
  }
}
