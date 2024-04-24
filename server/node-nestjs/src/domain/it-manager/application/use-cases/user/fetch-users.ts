import { Either, success } from '@/core/either'
import { User } from '@/domain/it-manager/enterprise/entities/user'

import { UsersRepository } from '../../repositories/users-repository'

interface FetchUsersUseCaseProps {
  email?: string
  department?: string
}

type FetchUsersUseCaseResponse = Either<void, { users: User[] }>

export class FetchUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(props: FetchUsersUseCaseProps = {}): Promise<FetchUsersUseCaseResponse> {
    const users = await this.usersRepository.findMany(props)

    return success({
      users,
    })
  }
}
