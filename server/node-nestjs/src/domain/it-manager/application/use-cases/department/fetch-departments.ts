import { Either, success } from '@/core/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Department } from '@/domain/it-manager/enterprise/entities/department'

import { DepartmentsRepository } from '../../repositories/departments-repository'

type FetchDepartmentsUseCaseResponse = Either<void, { departments: Department[] }>

export class FetchDepartmentsUseCase implements UseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute(): Promise<FetchDepartmentsUseCaseResponse> {
    const departments = await this.departmentsRepository.findMany()

    return success({
      departments,
    })
  }
}
