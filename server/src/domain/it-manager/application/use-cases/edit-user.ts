import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DepartmentsRepository } from '../repositories/departments-repositories'
import { UsersRepository } from '../repositories/users-repository'
import { Phone } from '../../enterprise/entities/value-objects/phone'

interface EditUserUseCaseProps {
  userId: string
  departmentId: string
  name: string
  email: string
  phone: string
  badge: string
}

export class EditUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private departmentsRepository: DepartmentsRepository,
  ) {}

  async execute({ userId, departmentId, name, email, phone, badge }: EditUserUseCaseProps) {
    const department = await this.departmentsRepository.findById(departmentId)

    if (!department) {
      throw new Error('Department not found.')
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('User not found.')
    }

    user.departmentId = new UniqueEntityID(departmentId)
    user.name = name
    user.email = email
    user.phone = phone ? Phone.format(phone) : null
    user.badge = badge

    await this.usersRepository.save(user)

    return {
      user,
    }
  }
}
