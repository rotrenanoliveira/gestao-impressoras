import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { Department } from '@/domain/it-manager/enterprise/entities/department'

import { DepartmentsRepository } from '../../repositories/departments-repository'

interface EditDepartmentProps {
  departmentId: string
  description: string
  email: string | null
}

type EditDepartmentUseCaseResponse = Either<ResourceNotFoundError, { department: Department }>

export class EditDepartmentUseCase implements UseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({ departmentId, description, email }: EditDepartmentProps): Promise<EditDepartmentUseCaseResponse> {
    const department = await this.departmentsRepository.findById(departmentId)

    if (!department) {
      return failure(new ResourceNotFoundError(`Department with id ${departmentId} not found`))
    }

    department.description = description
    department.email = email

    await this.departmentsRepository.save(department)

    return success({
      department,
    })
  }
}
