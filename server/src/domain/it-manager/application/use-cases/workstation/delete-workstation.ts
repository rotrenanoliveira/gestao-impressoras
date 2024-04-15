import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { WorkstationsRepository } from '../../repositories/workstations-repository'

interface DeleteWorkstationUseCaseProps {
  workstationId: string
}

type DeleteWorkstationUseCaseResponse = Either<ResourceNotFoundError, Record<string, never>>

export class DeleteWorkstationUseCase implements UseCase {
  constructor(private workstationsRepository: WorkstationsRepository) {}

  async execute({ workstationId }: DeleteWorkstationUseCaseProps): Promise<DeleteWorkstationUseCaseResponse> {
    const workstation = await this.workstationsRepository.findById(workstationId)

    if (!workstation) {
      return failure(new ResourceNotFoundError(`Workstation with id ${workstationId} not found`))
    }

    await this.workstationsRepository.delete(workstationId)

    return success({})
  }
}
