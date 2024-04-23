import { Either, success } from '@/core/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

import { WorkstationsRepository } from '../../repositories/workstations-repository'

type FetchWorkstationsUseCaseResponse = Either<void, { workstations: Workstation[] }>

export class FetchWorkstationsUseCase implements UseCase {
  constructor(private workstationsRepository: WorkstationsRepository) {}

  async execute(): Promise<FetchWorkstationsUseCaseResponse> {
    const workstations = await this.workstationsRepository.findMany()

    return success({
      workstations,
    })
  }
}
