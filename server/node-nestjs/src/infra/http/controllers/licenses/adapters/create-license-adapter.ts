import { Injectable } from '@nestjs/common'

import { LicensesRepository } from '@/domain/it-manager/application/repositories/licenses-repository'
import { CreateLicenseUseCase } from '@/domain/it-manager/application/use-cases/license/create-license'

@Injectable()
export class CreateLicenseUseCaseAdapter extends CreateLicenseUseCase {
  constructor(licensesRepository: LicensesRepository) {
    super(licensesRepository)
  }
}
