import { Injectable } from '@nestjs/common'

import { LicensesRepository } from '@/domain/it-manager/application/repositories/licenses-repository'
import { EditLicenseQuantityUseCase } from '@/domain/it-manager/application/use-cases/license/edit-license-quantity'

@Injectable()
export class EditLicenseQuantityUseCaseAdapter extends EditLicenseQuantityUseCase {
  constructor(licensesRepository: LicensesRepository) {
    super(licensesRepository)
  }
}
