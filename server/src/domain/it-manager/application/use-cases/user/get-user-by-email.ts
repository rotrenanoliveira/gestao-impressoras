import { Either, failure, success } from '@/core/either'
import { ResourceNotFound, ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { User } from '@/domain/it-manager/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'

interface GetUserByEmailUseCaseProps {
  email: string
}

type GetUserByEmailUseCaseResponse = Either<ResourceNotFoundError, { user: User }>

export class GetUserByEmailUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email }: GetUserByEmailUseCaseProps): Promise<GetUserByEmailUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return failure(ResourceNotFound(`User with email ${email} not found`))
    }

    return success({
      user,
    })
  }
}
