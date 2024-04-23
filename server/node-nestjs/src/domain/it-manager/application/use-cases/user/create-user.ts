import { Either, failure, success } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { User } from '@/domain/it-manager/enterprise/entities/user'
import { Phone } from '@/domain/it-manager/enterprise/entities/value-objects/phone'

import { DepartmentsRepository } from '../../repositories/departments-repository'
import { UsersRepository } from '../../repositories/users-repository'

interface CreateUserUseCaseProps {
  departmentId: string
  workstationId: string | null
  name: string
  email: string
  phone: string | null
  badge: string
}

type CreateUserUseCaseResponse = Either<ResourceNotFoundError, { user: User }>

export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private departmentsRepository: DepartmentsRepository,
  ) {}

  async execute({
    departmentId,
    workstationId,
    name,
    email,
    phone,
    badge,
  }: CreateUserUseCaseProps): Promise<CreateUserUseCaseResponse> {
    const department = await this.departmentsRepository.findById(departmentId)

    if (!department) {
      return failure(new ResourceNotFoundError(`Department with id ${departmentId} not found`))
    }

    const phoneNumber = phone ? Phone.format(phone) : null

    const user = User.create({
      departmentId: new UniqueEntityID(departmentId),
      workstationId: workstationId ? new UniqueEntityID(workstationId) : null,
      phone: phoneNumber,
      email,
      badge,
      name,
    })

    await this.usersRepository.create(user)

    return success({
      user,
    })
  }
}
