import { Either, failure, success } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { Department } from '@/domain/it-manager/enterprise/entities/department'

import { DepartmentsRepository } from '../../repositories/departments-repository'
import { UsersRepository } from '../../repositories/users-repository'

interface EditChiefDepartmentUseCaseProps {
  departmentId: string
  chiefId: string | null
}

type EditChiefDepartmentUseCaseResponse = Either<ResourceNotFoundError, { department: Department }>

export class EditChiefDepartmentUseCase implements UseCase {
  constructor(
    private departmentsRepository: DepartmentsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    departmentId,
    chiefId,
  }: EditChiefDepartmentUseCaseProps): Promise<EditChiefDepartmentUseCaseResponse> {
    const department = await this.departmentsRepository.findById(departmentId)

    if (!department) {
      return failure(new ResourceNotFoundError(`Department with id ${departmentId} not found`))
    }

    if (chiefId) {
      const userOnRepository = await this.usersRepository.findById(chiefId)

      if (!userOnRepository) {
        return failure(new ResourceNotFoundError(`User with id ${chiefId} not found`))
      }
    }

    department.chiefId = chiefId ? new UniqueEntityID(chiefId) : null

    await this.departmentsRepository.save(department)

    return success({
      department,
    })
  }
}
