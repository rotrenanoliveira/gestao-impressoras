import { UsersRepository } from '../repositories/users-repository'

interface GetUserByIdUseCaseProps {
  userId: string
}

export class GetUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: GetUserByIdUseCaseProps) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('User not found.')
    }

    return {
      user,
    }
  }
}
