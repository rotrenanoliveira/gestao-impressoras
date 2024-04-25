import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { Department } from '@/domain/it-manager/enterprise/entities/department'

import { DepartmentsRepository } from '../../repositories/departments-repository'
import { UsersRepository } from '../../repositories/users-repository'

interface AddChiefToDepartmentUseCaseProps {
  departmentId: string
  chiefId: string
}

type AddChiefToDepartmentUseCaseResponse = Either<ResourceNotFoundError, { department: Department }>

export class AddChiefToDepartmentUseCase implements UseCase {
  constructor(
    private departmentsRepository: DepartmentsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    departmentId,
    chiefId,
  }: AddChiefToDepartmentUseCaseProps): Promise<AddChiefToDepartmentUseCaseResponse> {
    const department = await this.departmentsRepository.findById(departmentId)
    if (!department) {
      return failure(new ResourceNotFoundError(`Department with id ${departmentId} not found`))
    }

    const user = await this.usersRepository.findById(chiefId)
    if (!user) {
      return failure(new ResourceNotFoundError(`User with id ${chiefId} not found`))
    }

    department.chief = user

    await this.departmentsRepository.save(department)

    return success({
      department,
    })
  }
}
