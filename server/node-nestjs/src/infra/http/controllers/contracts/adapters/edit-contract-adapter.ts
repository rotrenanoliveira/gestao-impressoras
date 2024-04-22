import { Injectable } from '@nestjs/common'

import { ContractsRepository } from '@/domain/it-manager/application/repositories/contracts-repository'
import { EditContractUseCase } from '@/domain/it-manager/application/use-cases/contract/edit-contract'

@Injectable()
export class EditContractUseCaseAdapter extends EditContractUseCase {
  constructor(contractsRepository: ContractsRepository) {
    super(contractsRepository)
  }
}
