import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DepartmentsRepository } from '../../repositories/departments-repositories'
import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { UseCase } from '@/core/use-cases/use-case'

interface EditDepartmentProps {
  departmentId: string
  chiefId: string | null
  description: string
  email: string | null
}

type EditDepartmentUseCaseResponse = Either<ResourceNotFoundError, { department: Department }>

export class EditDepartmentUseCase implements UseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({
    departmentId,
    chiefId,
    description,
    email,
  }: EditDepartmentProps): Promise<EditDepartmentUseCaseResponse> {
    const department = await this.departmentsRepository.findById(departmentId)

    if (!department) {
      return failure(new ResourceNotFoundError(`Department with id ${departmentId} not found`))
    }

    department.description = description
    department.email = email
    department.chiefId = chiefId ? new UniqueEntityID(chiefId) : null

    await this.departmentsRepository.save(department)

    return success({
      department,
    })
  }
}
