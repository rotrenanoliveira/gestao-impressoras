import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { User } from '@/domain/it-manager/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'

interface InactiveUserUseCaseProps {
  userId: string
}

type InactiveUserUseCaseResponse = Either<ResourceNotFoundError, { user: User }>

export class InactiveUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: InactiveUserUseCaseProps): Promise<InactiveUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return failure(new ResourceNotFoundError(`User with id ${userId} not found`))
    }

    user.status = 'inactive'

    await this.usersRepository.save(user)

    return success({
      user,
    })
  }
}
