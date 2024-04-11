import { Either, failure, success } from '@/core/either'
import { ResourceNotFound, ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { User } from '@/domain/it-manager/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'

interface ActiveUserUseCaseProps {
  userId: string
}

type ActiveUserUseCaseResponse = Either<ResourceNotFoundError, { user: User }>

export class ActiveUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: ActiveUserUseCaseProps): Promise<ActiveUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return failure(ResourceNotFound(`User with id ${userId} not found`))
    }

    user.status = 'active'

    await this.usersRepository.save(user)

    return success({
      user,
    })
  }
}
