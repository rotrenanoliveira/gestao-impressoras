import { Injectable } from '@nestjs/common'

import { ContractsRepository } from '@/domain/it-manager/application/repositories/contracts-repository'
import { EditContractEndDateUseCase } from '@/domain/it-manager/application/use-cases/contract/edit-contract-end-date'

@Injectable()
export class EditContractEndDateUseCaseAdapter extends EditContractEndDateUseCase {
  constructor(contractsRepository: ContractsRepository) {
    super(contractsRepository)
  }
}
