import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'
import { WorkstationsRepository } from '../../repositories/workstations-repository'

interface GetWorkstationByIdUseCaseProps {
  workstationId: string
}

type GetWorkstationByIdUseCaseResponse = Either<ResourceNotFoundError, { workstation: Workstation }>

export class GetWorkstationByIdUseCase implements UseCase {
  constructor(private workstationsRepository: WorkstationsRepository) {}

  async execute({ workstationId }: GetWorkstationByIdUseCaseProps): Promise<GetWorkstationByIdUseCaseResponse> {
    const workstation = await this.workstationsRepository.findById(workstationId)

    if (!workstation) {
      return failure(new ResourceNotFoundError(`Workstation with id ${workstationId} not found`))
    }

    return success({
      workstation,
    })
  }
}
