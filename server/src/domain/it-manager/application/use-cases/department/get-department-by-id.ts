import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { DepartmentsRepository } from '../../repositories/departments-repositories'

interface GetDepartmentByIdUseCaseProps {
  departmentId: string
}

type GetDepartmentByIdUseCaseResponse = Either<ResourceNotFoundError, { department: Department }>

export class GetDepartmentByIdUseCase implements UseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({ departmentId }: GetDepartmentByIdUseCaseProps): Promise<GetDepartmentByIdUseCaseResponse> {
    const department = await this.departmentsRepository.findById(departmentId)

    if (!department) {
      return failure(new ResourceNotFoundError(`Department with id ${departmentId} not found`))
    }

    return success({ department })
  }
}
