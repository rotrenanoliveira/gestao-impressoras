import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '../../enterprise/entities/user'
import { DepartmentsRepository } from '../repositories/departments-repositories'
import { UsersRepository } from '../repositories/users-repository'
import { Phone } from '../../enterprise/entities/value-objects/phone'

interface RegisterUserUseCaseProps {
  departmentId: string
  name: string
  email: string
  phone: string | null
  badge: string
}

export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private departmentsRepository: DepartmentsRepository,
  ) {}

  async execute({ departmentId, name, email, phone, badge }: RegisterUserUseCaseProps) {
    const department = await this.departmentsRepository.findById(departmentId)

    if (!department) {
      throw new Error('Department not found.')
    }

    const phoneNumber = phone ? Phone.format(phone) : null

    const user = User.create({
      departmentId: new UniqueEntityID(departmentId),
      phone: phoneNumber,
      email,
      badge,
      name,
    })

    await this.usersRepository.create(user)

    return {
      user,
    }
  }
}
