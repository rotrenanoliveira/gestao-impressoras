import { Injectable } from '@nestjs/common'

import { PrintersRepository } from '@/domain/it-manager/application/repositories/printers-repository'
import { GetPrinterByIdUseCase } from '@/domain/it-manager/application/use-cases/printer/get-printer-by-id'

@Injectable()
export class GetPrinterByIdUseCaseAdapter extends GetPrinterByIdUseCase {
  constructor(printersRepository: PrintersRepository) {
    super(printersRepository)
  }
}
