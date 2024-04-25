import { Injectable } from '@nestjs/common'

import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repository'
import { CreateDepartmentUseCase } from '@/domain/it-manager/application/use-cases/department/create-department'

@Injectable()
export class CreateDepartmentUseCaseAdapter extends CreateDepartmentUseCase {
  constructor(departmentsRepository: DepartmentsRepository) {
    super(departmentsRepository)
  }
}
