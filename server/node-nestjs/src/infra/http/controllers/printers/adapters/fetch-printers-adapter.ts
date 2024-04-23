import { Injectable } from '@nestjs/common'

import { PrintersRepository } from '@/domain/it-manager/application/repositories/printers-repository'
import { FetchPrintersUseCase } from '@/domain/it-manager/application/use-cases/printer/fetch-printers'

@Injectable()
export class FetchPrintersUseCaseAdapter extends FetchPrintersUseCase {
  constructor(printersRepository: PrintersRepository) {
    super(printersRepository)
  }
}
