import { Injectable } from '@nestjs/common'

import { PrintersRepository } from '@/domain/it-manager/application/repositories/printers-repository'
import { DeletePrinterUseCase } from '@/domain/it-manager/application/use-cases/printer/delete-printer'

@Injectable()
export class DeletePrinterUseCaseAdapter extends DeletePrinterUseCase {
  constructor(printersRepository: PrintersRepository) {
    super(printersRepository)
  }
}
