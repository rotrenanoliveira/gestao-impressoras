import { Either, success } from '@/core/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

import { WorkstationsRepository } from '../../repositories/workstations-repository'

interface FetchWorkstationsUseCaseProps {
  department?: string
}

type FetchWorkstationsUseCaseResponse = Either<void, { workstations: Workstation[] }>

export class FetchWorkstationsUseCase implements UseCase {
  constructor(private workstationsRepository: WorkstationsRepository) {}

  async execute(params: FetchWorkstationsUseCaseProps = {}): Promise<FetchWorkstationsUseCaseResponse> {
    const workstations = await this.workstationsRepository.findMany(params)

    return success({
      workstations,
    })
  }
}
