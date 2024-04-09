import { UsersRepository } from '../repositories/users-repository'

interface InactiveUserUseCaseProps {
  userId: string
}

export class InactiveUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: InactiveUserUseCaseProps) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('User not found.')
    }

    user.status = 'inactive'

    await this.usersRepository.save(user)

    return {
      user,
    }
  }
}
