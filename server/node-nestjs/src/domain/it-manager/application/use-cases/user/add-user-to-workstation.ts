import { Either, failure, success } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { User } from '@/domain/it-manager/enterprise/entities/user'

import { UsersRepository } from '../../repositories/users-repository'
import { WorkstationsRepository } from '../../repositories/workstations-repository'

interface AddUserToWorkstationUseCaseProps {
  userId: string
  workstationId: string
}

type AddUserToWorkstationUseCaseResponse = Either<ResourceNotFoundError, { user: User }>

export class AddUserToWorkstationUseCase implements UseCase {
  constructor(
    private usersRepository: UsersRepository,
    private workstationsRepository: WorkstationsRepository,
  ) {}

  async execute({
    userId,
    workstationId,
  }: AddUserToWorkstationUseCaseProps): Promise<AddUserToWorkstationUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return failure(new ResourceNotFoundError(`User with id ${userId} not found`))
    }

    const workstation = await this.workstationsRepository.findById(workstationId)

    if (!workstation) {
      return failure(new ResourceNotFoundError(`Workstation with id ${workstationId} not found`))
    }

    user.workstationId = new UniqueEntityID(workstationId)

    await this.usersRepository.save(user)

    return success({
      user,
    })
  }
}
