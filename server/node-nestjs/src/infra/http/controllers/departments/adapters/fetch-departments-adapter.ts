import { Injectable } from '@nestjs/common'

import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repository'
import { FetchDepartmentsUseCase } from '@/domain/it-manager/application/use-cases/department/fetch-departments-with-chief'

@Injectable()
export class FetchDepartmentsUseCaseAdapter extends FetchDepartmentsUseCase {
  constructor(departmentsRepository: DepartmentsRepository) {
    super(departmentsRepository)
  }
}
