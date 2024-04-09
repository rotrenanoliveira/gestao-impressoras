import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DepartmentsRepository } from '../repositories/departments-repositories'
import { UsersRepository } from '../repositories/users-repository'

interface EditUserDepartmentUseCaseProps {
  userId: string
  departmentId: string
}

export class EditUserDepartmentUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private departmentsRepository: DepartmentsRepository,
  ) {}

  async execute({ userId, departmentId }: EditUserDepartmentUseCaseProps) {
    const department = await this.departmentsRepository.findById(departmentId)

    if (!department) {
      throw new Error('Department not found.')
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('User not found.')
    }

    user.departmentId = new UniqueEntityID(departmentId)

    await this.usersRepository.save(user)

    return {
      user,
    }
  }
}
