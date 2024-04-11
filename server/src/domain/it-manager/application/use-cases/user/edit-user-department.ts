import { Either, failure, success } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError, ResourceNotFound } from '@/core/errors/resource-not-found'
import { User } from '@/domain/it-manager/enterprise/entities/user'
import { DepartmentsRepository } from '../../repositories/departments-repositories'
import { UsersRepository } from '../../repositories/users-repository'

interface EditUserDepartmentUseCaseProps {
  userId: string
  departmentId: string
}

type EditUserDepartmentUseCaseResponse = Either<ResourceNotFoundError, { user: User }>

export class EditUserDepartmentUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private departmentsRepository: DepartmentsRepository,
  ) {}

  async execute({ userId, departmentId }: EditUserDepartmentUseCaseProps): Promise<EditUserDepartmentUseCaseResponse> {
    const department = await this.departmentsRepository.findById(departmentId)

    if (!department) {
      return failure(ResourceNotFound(`Department with id ${departmentId} not found`))
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return failure(ResourceNotFound(`User with id ${userId} not found`))
    }

    user.departmentId = new UniqueEntityID(departmentId)

    await this.usersRepository.save(user)

    return success({
      user,
    })
  }
}
