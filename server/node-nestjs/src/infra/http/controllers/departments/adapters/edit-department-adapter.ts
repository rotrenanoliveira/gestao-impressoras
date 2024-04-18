import { Injectable } from '@nestjs/common'

import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repository'
import { EditDepartmentUseCase } from '@/domain/it-manager/application/use-cases/department/edit-department'

@Injectable()
export class EditDepartmentUseCaseAdapter extends EditDepartmentUseCase {
  constructor(departmentsRepository: DepartmentsRepository) {
    super(departmentsRepository)
  }
}
