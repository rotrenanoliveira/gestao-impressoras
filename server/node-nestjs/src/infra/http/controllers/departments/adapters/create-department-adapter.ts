import { Injectable } from '@nestjs/common'

import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repository'
import { RegisterDepartmentUseCase } from '@/domain/it-manager/application/use-cases/department/register-department'

@Injectable()
export class CreateDepartmentUseCaseAdapter extends RegisterDepartmentUseCase {
  constructor(departmentsRepository: DepartmentsRepository) {
    super(departmentsRepository)
  }
}
