import { UsersRepository } from '../repositories/users-repository'

interface GetUserByEmailUseCaseProps {
  email: string
}

export class GetUserByEmailUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email }: GetUserByEmailUseCaseProps) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error('User not found.')
    }

    return {
      user,
    }
  }
}
