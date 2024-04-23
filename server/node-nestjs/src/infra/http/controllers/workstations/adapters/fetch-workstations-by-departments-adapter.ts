import { Injectable } from '@nestjs/common'

import { WorkstationsRepository } from '@/domain/it-manager/application/repositories/workstations-repository'
import { FetchWorkstationsByDepartmentUseCase } from '@/domain/it-manager/application/use-cases/workstation/fetch-workstations-by-department'

@Injectable()
export class FetchWorkstationsByIdUseCaseAdapter extends FetchWorkstationsByDepartmentUseCase {
  constructor(workstationsRepository: WorkstationsRepository) {
    super(workstationsRepository)
  }
}
