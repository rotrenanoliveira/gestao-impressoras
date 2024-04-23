import { Injectable } from '@nestjs/common'

import { ComputersRepository } from '@/domain/it-manager/application/repositories/computers-repository'
import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repository'
import { WorkstationsRepository } from '@/domain/it-manager/application/repositories/workstations-repository'
import { CreateWorkstationUseCase } from '@/domain/it-manager/application/use-cases/workstation/create-workstation'

@Injectable()
export class CreateWorkstationUseCaseAdapter extends CreateWorkstationUseCase {
  constructor(
    workstationRepository: WorkstationsRepository,
    computersRepository: ComputersRepository,
    departmentsRepository: DepartmentsRepository,
  ) {
    super(workstationRepository, departmentsRepository, computersRepository)
  }
}
