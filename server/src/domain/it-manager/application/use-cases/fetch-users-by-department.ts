import { UsersRepository } from '../repositories/users-repository'

interface FetchUsersByDepartmentUseCaseProps {
  departmentId: string
}

export class FetchUsersByDepartmentUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ departmentId }: FetchUsersByDepartmentUseCaseProps) {
    const users = await this.usersRepository.findManyByDepartment(departmentId)

    return {
      users,
    }
  }
}
