import { Injectable } from '@nestjs/common'

import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repository'
import { UsersRepository } from '@/domain/it-manager/application/repositories/users-repository'
import { AddChiefToDepartmentUseCase } from '@/domain/it-manager/application/use-cases/department/add-chief-to-department'

@Injectable()
export class AddChiefToDepartmentUseCaseAdapter extends AddChiefToDepartmentUseCase {
  constructor(departmentsRepository: DepartmentsRepository, usersRepository: UsersRepository) {
    super(departmentsRepository, usersRepository)
  }
}
