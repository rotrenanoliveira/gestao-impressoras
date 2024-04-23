import { Injectable } from '@nestjs/common'

import { ContractsRepository } from '@/domain/it-manager/application/repositories/contracts-repository'
import { DeleteContractUseCase } from '@/domain/it-manager/application/use-cases/contract/delete-contract'

@Injectable()
export class DeleteContractUseCaseAdapter extends DeleteContractUseCase {
  constructor(contractsRepository: ContractsRepository) {
    super(contractsRepository)
  }
}
