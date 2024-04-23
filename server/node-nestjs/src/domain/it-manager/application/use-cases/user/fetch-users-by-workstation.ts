import { Either, success } from '@/core/either'
import { UseCase } from '@/core/use-cases/use-case'
import { User } from '@/domain/it-manager/enterprise/entities/user'

import { UsersRepository } from '../../repositories/users-repository'

interface FetchUsersByWorkstationUseCaseProps {
  workstationId: string
}

type FetchUsersByWorkstationUseCaseResponse = Either<void, { users: User[] }>

export class FetchUsersByWorkstationUseCase implements UseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    workstationId,
  }: FetchUsersByWorkstationUseCaseProps): Promise<FetchUsersByWorkstationUseCaseResponse> {
    const users = await this.usersRepository.findManyByWorkstation(workstationId)

    return success({
      users,
    })
  }
}
