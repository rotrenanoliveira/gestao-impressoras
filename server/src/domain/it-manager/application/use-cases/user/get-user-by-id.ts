import { Either, failure, success } from '@/core/either'
import { ResourceNotFound, ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { User } from '@/domain/it-manager/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'

interface GetUserByIdUseCaseProps {
  userId: string
}

type GetUserByIdUseCaseResponse = Either<ResourceNotFoundError, { user: User }>

export class GetUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: GetUserByIdUseCaseProps): Promise<GetUserByIdUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return failure(ResourceNotFound(`User with id ${userId} not found`))
    }

    return success({
      user,
    })
  }
}
