import { Injectable } from '@nestjs/common'

import { ComputersRepository } from '@/domain/it-manager/application/repositories/computers-repository'
import { ContractsRepository } from '@/domain/it-manager/application/repositories/contracts-repository'
import { CreateComputerUseCase } from '@/domain/it-manager/application/use-cases/computer/create-computer'

@Injectable()
export class CreateComputerUseCaseAdapter extends CreateComputerUseCase {
  constructor(computersRepository: ComputersRepository, contractsRepository: ContractsRepository) {
    super(computersRepository, contractsRepository)
  }
}
