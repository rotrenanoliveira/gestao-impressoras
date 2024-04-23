import { Injectable } from '@nestjs/common'

import { WorkstationsRepository } from '@/domain/it-manager/application/repositories/workstations-repository'
import { DeleteWorkstationUseCase } from '@/domain/it-manager/application/use-cases/workstation/delete-workstation'

@Injectable()
export class DeleteWorkstationUseCaseAdapter extends DeleteWorkstationUseCase {
  constructor(workstationsRepository: WorkstationsRepository) {
    super(workstationsRepository)
  }
}
