import { UsersRepository } from '../repositories/users-repository'

interface ActiveUserUseCaseProps {
  userId: string
}

export class ActiveUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: ActiveUserUseCaseProps) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('User not found.')
    }

    user.status = 'active'

    await this.usersRepository.save(user)

    return {
      user,
    }
  }
}
