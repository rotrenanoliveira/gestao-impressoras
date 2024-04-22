import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'

import { ComputersRepository } from '../../repositories/computers-repository'

interface DeleteComputerUseCaseProps {
  computerId: string
}

type DeleteComputerUseCaseResponse = Either<ResourceNotFoundError, Record<string, never>>

export class DeleteComputerUseCase implements UseCase {
  constructor(private computersRepository: ComputersRepository) {}

  async execute({ computerId }: DeleteComputerUseCaseProps): Promise<DeleteComputerUseCaseResponse> {
    const computer = await this.computersRepository.findById(computerId)

    if (!computer) {
      return failure(new ResourceNotFoundError(`Computer with id ${computerId} not found`))
    }

    await this.computersRepository.delete(computer)

    return success({})
  }
}
