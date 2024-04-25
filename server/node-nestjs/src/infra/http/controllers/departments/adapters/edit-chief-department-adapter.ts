import { Injectable } from '@nestjs/common'

import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repository'
import { UsersRepository } from '@/domain/it-manager/application/repositories/users-repository'
import { EditChiefDepartmentUseCase } from '@/domain/it-manager/application/use-cases/department/edit-chief-department'

@Injectable()
export class EditChiefDepartmentUseCaseAdapter extends EditChiefDepartmentUseCase {
  constructor(departmentsRepository: DepartmentsRepository, usersRepository: UsersRepository) {
    super(departmentsRepository, usersRepository)
  }
}
