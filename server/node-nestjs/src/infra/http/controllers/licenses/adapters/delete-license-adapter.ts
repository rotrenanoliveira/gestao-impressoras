import { Injectable } from '@nestjs/common'

import { LicensesRepository } from '@/domain/it-manager/application/repositories/licenses-repository'
import { DeleteLicenseUseCase } from '@/domain/it-manager/application/use-cases/license/delete-license'

@Injectable()
export class DeleteLicenseUseCaseAdapter extends DeleteLicenseUseCase {
  constructor(licensesRepository: LicensesRepository) {
    super(licensesRepository)
  }
}
