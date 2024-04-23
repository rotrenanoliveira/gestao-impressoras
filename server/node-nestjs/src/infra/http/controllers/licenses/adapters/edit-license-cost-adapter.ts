import { Injectable } from '@nestjs/common'

import { LicensesRepository } from '@/domain/it-manager/application/repositories/licenses-repository'
import { EditLicenseCostUseCase } from '@/domain/it-manager/application/use-cases/license/edit-license-cost'

@Injectable()
export class EditLicenseCostUseCaseAdapter extends EditLicenseCostUseCase {
  constructor(licensesRepository: LicensesRepository) {
    super(licensesRepository)
  }
}
