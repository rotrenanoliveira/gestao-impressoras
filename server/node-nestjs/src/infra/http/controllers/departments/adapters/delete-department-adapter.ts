import { Injectable } from '@nestjs/common'

import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repository'
import { DeleteDepartmentUseCase } from '@/domain/it-manager/application/use-cases/department/delete.department'

@Injectable()
export class DeleteDepartmentUseCaseAdapter extends DeleteDepartmentUseCase {
  constructor(departmentsRepository: DepartmentsRepository) {
    super(departmentsRepository)
  }
}
