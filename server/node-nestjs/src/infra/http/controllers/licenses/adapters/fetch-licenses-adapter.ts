import { Injectable } from '@nestjs/common'

import { LicensesRepository } from '@/domain/it-manager/application/repositories/licenses-repository'
import { FetchLicensesUseCase } from '@/domain/it-manager/application/use-cases/license/fetch-licenses'

@Injectable()
export class FetchLicensesUseCaseAdapter extends FetchLicensesUseCase {
  constructor(licensesRepository: LicensesRepository) {
    super(licensesRepository)
  }
}
