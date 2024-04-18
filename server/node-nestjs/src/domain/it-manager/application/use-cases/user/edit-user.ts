import { Either, failure, success } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { User } from '@/domain/it-manager/enterprise/entities/user'
import { Phone } from '@/domain/it-manager/enterprise/entities/value-objects/phone'

import { DepartmentsRepository } from '../../repositories/departments-repository'
import { UsersRepository } from '../../repositories/users-repository'

interface EditUserUseCaseProps {
  userId: string
  departmentId: string
  name: string
  email: string
  phone: string | null
  badge: string
}

type EditUserUseCaseResponse = Either<ResourceNotFoundError, { user: User }>

export class EditUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private departmentsRepository: DepartmentsRepository,
  ) {}

  async execute({
    userId,
    departmentId,
    name,
    email,
    phone,
    badge,
  }: EditUserUseCaseProps): Promise<EditUserUseCaseResponse> {
    const department = await this.departmentsRepository.findById(departmentId)

    if (!department) {
      return failure(new ResourceNotFoundError(`Department with id ${departmentId} not found`))
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return failure(new ResourceNotFoundError(`User with id ${userId} not found`))
    }

    user.departmentId = new UniqueEntityID(departmentId)
    user.name = name
    user.email = email
    user.phone = phone ? Phone.format(phone) : null
    user.badge = badge

    await this.usersRepository.save(user)

    return success({
      user,
    })
  }
}
