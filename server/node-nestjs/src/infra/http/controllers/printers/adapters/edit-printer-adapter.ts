import { Injectable } from '@nestjs/common'

import { ContractsRepository } from '@/domain/it-manager/application/repositories/contracts-repository'
import { PrintersRepository } from '@/domain/it-manager/application/repositories/printers-repository'
import { EditPrinterUseCase } from '@/domain/it-manager/application/use-cases/printer/edit-printer'

@Injectable()
export class EditPrinterUseCaseAdapter extends EditPrinterUseCase {
  constructor(printersRepository: PrintersRepository, contractsRepository: ContractsRepository) {
    super(printersRepository, contractsRepository)
  }
}
