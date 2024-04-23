import { Injectable } from '@nestjs/common'

import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repository'
import { UsersRepository } from '@/domain/it-manager/application/repositories/users-repository'
import { EditUserDepartmentUseCase } from '@/domain/it-manager/application/use-cases/user/edit-user-department'

@Injectable()
export class EditUserDepartmentUseCaseAdapter extends EditUserDepartmentUseCase {
  constructor(usersRepository: UsersRepository, departmentsRepository: DepartmentsRepository) {
    super(usersRepository, departmentsRepository)
  }
}
