import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'

import { DepartmentsRepository } from '../../repositories/departments-repository'

interface DeleteDepartmentUseCaseProps {
  departmentId: string
}

type DeleteDepartmentUseCaseResponse = Either<ResourceNotFoundError, Record<string, never>>

export class DeleteDepartmentUseCase implements UseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({ departmentId }: DeleteDepartmentUseCaseProps): Promise<DeleteDepartmentUseCaseResponse> {
    const department = await this.departmentsRepository.findById(departmentId)

    if (!department) {
      return failure(new ResourceNotFoundError(`Department with id ${departmentId} not found`))
    }

    await this.departmentsRepository.delete(department)

    return success({})
  }
}
