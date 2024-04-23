import { Either, success } from '@/core/either'
import { User } from '@/domain/it-manager/enterprise/entities/user'

import { UsersRepository } from '../../repositories/users-repository'

interface FetchUsersByDepartmentUseCaseProps {
  departmentId: string
}

type FetchUsersByDepartmentUseCaseResponse = Either<void, { users: User[] }>

export class FetchUsersByDepartmentUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ departmentId }: FetchUsersByDepartmentUseCaseProps): Promise<FetchUsersByDepartmentUseCaseResponse> {
    const users = await this.usersRepository.findManyByDepartment(departmentId)

    return success({
      users,
    })
  }
}
