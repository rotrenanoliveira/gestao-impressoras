import { Injectable } from '@nestjs/common'

import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repository'
import { LicensesRepository } from '@/domain/it-manager/application/repositories/licenses-repository'
import { UserLicensesRepository } from '@/domain/it-manager/application/repositories/user-licenses-repository'
import { UsersRepository } from '@/domain/it-manager/application/repositories/users-repository'
import { CreateUserLicenseUseCase } from '@/domain/it-manager/application/use-cases/user-license/create-user-license'

@Injectable()
export class CreateUserLicenseUseCaseAdapter extends CreateUserLicenseUseCase {
  constructor(
    usersLicensesRepository: UserLicensesRepository,
    licensesRepository: LicensesRepository,
    usersRepository: UsersRepository,
    departmentsRepository: DepartmentsRepository,
  ) {
    super(usersLicensesRepository, licensesRepository, usersRepository, departmentsRepository)
  }
}
