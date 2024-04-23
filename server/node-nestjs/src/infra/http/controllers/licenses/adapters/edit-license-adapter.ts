import { Injectable } from '@nestjs/common'

import { LicensesRepository } from '@/domain/it-manager/application/repositories/licenses-repository'
import { EditLicenseUseCase } from '@/domain/it-manager/application/use-cases/license/edit-license'

@Injectable()
export class EditLicenseUseCaseAdapter extends EditLicenseUseCase {
  constructor(licensesRepository: LicensesRepository) {
    super(licensesRepository)
  }
}
