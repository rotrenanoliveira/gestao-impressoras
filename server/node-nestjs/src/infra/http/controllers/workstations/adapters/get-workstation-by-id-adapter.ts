import { Injectable } from '@nestjs/common'

import { WorkstationsRepository } from '@/domain/it-manager/application/repositories/workstations-repository'
import { GetWorkstationByIdUseCase } from '@/domain/it-manager/application/use-cases/workstation/get-workstation-by-id'

@Injectable()
export class GetWorkstationByIdUseCaseAdapter extends GetWorkstationByIdUseCase {
  constructor(workstationsRepository: WorkstationsRepository) {
    super(workstationsRepository)
  }
}
