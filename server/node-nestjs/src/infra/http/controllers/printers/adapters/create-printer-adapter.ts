import { Injectable } from '@nestjs/common'

import { ContractsRepository } from '@/domain/it-manager/application/repositories/contracts-repository'
import { PrintersRepository } from '@/domain/it-manager/application/repositories/printers-repository'
import { CreatePrinterUseCase } from '@/domain/it-manager/application/use-cases/printer/create-printer'

@Injectable()
export class CreatePrinterUseCaseAdapter extends CreatePrinterUseCase {
  constructor(printersRepository: PrintersRepository, contractsRepository: ContractsRepository) {
    super(printersRepository, contractsRepository)
  }
}
