import { Injectable } from '@nestjs/common'

import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repository'
import { GetDepartmentByIdUseCase } from '@/domain/it-manager/application/use-cases/department/get-department-by-id'

@Injectable()
export class GetDepartmentByIdUseCaseAdapter extends GetDepartmentByIdUseCase {
  constructor(departmentsRepository: DepartmentsRepository) {
    super(departmentsRepository)
  }
}
