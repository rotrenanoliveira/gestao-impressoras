import { Injectable } from '@nestjs/common'

import { ContractsRepository } from '@/domain/it-manager/application/repositories/contracts-repository'
import { GetContractByIdUseCase } from '@/domain/it-manager/application/use-cases/contract/get-contract-by-id'

@Injectable()
export class GetContractByIdUseCaseAdapter extends GetContractByIdUseCase {
  constructor(contractsRepository: ContractsRepository) {
    super(contractsRepository)
  }
}
