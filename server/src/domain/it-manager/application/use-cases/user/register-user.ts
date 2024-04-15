import { Either, failure, success } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { User } from '@/domain/it-manager/enterprise/entities/user'
import { Phone } from '@/domain/it-manager/enterprise/entities/value-objects/phone'
import { DepartmentsRepository } from '../../repositories/departments-repositories'
import { UsersRepository } from '../../repositories/users-repository'

interface RegisterUserUseCaseProps {
  departmentId: string
  workstationId: string | null
  name: string
  email: string
  phone: string | null
  badge: string
}

type RegisterUserUseCaseResponse = Either<ResourceNotFoundError, { user: User }>

export class RegisterUserUseCase {
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
  }: RegisterUserUseCaseProps): Promise<RegisterUserUseCaseResponse> {
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
