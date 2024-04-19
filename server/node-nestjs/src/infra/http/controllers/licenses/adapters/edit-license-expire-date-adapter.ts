import { Injectable } from '@nestjs/common'

import { LicensesRepository } from '@/domain/it-manager/application/repositories/licenses-repository'
import { EditLicenseExpireDateUseCase } from '@/domain/it-manager/application/use-cases/license/edit-license-expire-date'

@Injectable()
export class EditLicenseExpireDateUseCaseAdapter extends EditLicenseExpireDateUseCase {
  constructor(licensesRepository: LicensesRepository) {
    super(licensesRepository)
  }
}
