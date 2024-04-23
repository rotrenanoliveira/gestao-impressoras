import { Injectable } from '@nestjs/common'

import { UserLicensesRepository } from '@/domain/it-manager/application/repositories/user-licenses-repository'
import { DeleteUserLicenseUseCase } from '@/domain/it-manager/application/use-cases/user-license/delete-user-license'

@Injectable()
export class DeleteUserLicenseUseCaseAdapter extends DeleteUserLicenseUseCase {
  constructor(userLicensesRepository: UserLicensesRepository) {
    super(userLicensesRepository)
  }
}
