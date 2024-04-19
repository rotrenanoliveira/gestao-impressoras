import { Injectable } from '@nestjs/common'

import { LicensesRepository } from '@/domain/it-manager/application/repositories/licenses-repository'
import { GetLicenseByIdUseCase } from '@/domain/it-manager/application/use-cases/license/get-license-by-id'

@Injectable()
export class GetLicenseByIdUseCaseAdapter extends GetLicenseByIdUseCase {
  constructor(licensesRepository: LicensesRepository) {
    super(licensesRepository)
  }
}
