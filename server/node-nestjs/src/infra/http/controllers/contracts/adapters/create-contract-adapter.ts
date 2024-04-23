import { Injectable } from '@nestjs/common'

import { ContractsRepository } from '@/domain/it-manager/application/repositories/contracts-repository'
import { CreateContractUseCase } from '@/domain/it-manager/application/use-cases/contract/create-contract'

@Injectable()
export class CreateContractUseCaseAdapter extends CreateContractUseCase {
  constructor(contractsRepository: ContractsRepository) {
    super(contractsRepository)
  }
}
