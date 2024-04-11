import { Either, success } from '@/core/either'
import { User } from '@/domain/it-manager/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'

type FetchUsersUseCaseResponse = Either<void, { users: User[] }>

export class FetchUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<FetchUsersUseCaseResponse> {
    const users = await this.usersRepository.findMany()

    return success({
      users,
    })
  }
}
