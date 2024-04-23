import { Injectable } from '@nestjs/common'

import { WorkstationsRepository } from '@/domain/it-manager/application/repositories/workstations-repository'
import { FetchWorkstationsUseCase } from '@/domain/it-manager/application/use-cases/workstation/fetch-workstations'

@Injectable()
export class FetchWorkstationsUseCaseAdapter extends FetchWorkstationsUseCase {
  constructor(workstationsRepository: WorkstationsRepository) {
    super(workstationsRepository)
  }
}
