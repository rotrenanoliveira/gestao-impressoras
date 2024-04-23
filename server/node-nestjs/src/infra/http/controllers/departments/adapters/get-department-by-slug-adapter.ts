import { Injectable } from '@nestjs/common'

import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repository'
import { GetDepartmentBySlugUseCase } from '@/domain/it-manager/application/use-cases/department/get-department-by-slug'

@Injectable()
export class GetDepartmentBySlugUseCaseAdapter extends GetDepartmentBySlugUseCase {
  constructor(departmentsRepository: DepartmentsRepository) {
    super(departmentsRepository)
  }
}
