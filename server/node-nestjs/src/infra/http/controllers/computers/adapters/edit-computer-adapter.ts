import { Injectable } from '@nestjs/common'

import { ComputersRepository } from '@/domain/it-manager/application/repositories/computers-repository'
import { ContractsRepository } from '@/domain/it-manager/application/repositories/contracts-repository'
import { EditComputerUseCase } from '@/domain/it-manager/application/use-cases/computer/edit-computer'

@Injectable()
export class EditComputerUseCaseAdapter extends EditComputerUseCase {
  constructor(computersRepository: ComputersRepository, contractsRepository: ContractsRepository) {
    super(computersRepository, contractsRepository)
  }
}
