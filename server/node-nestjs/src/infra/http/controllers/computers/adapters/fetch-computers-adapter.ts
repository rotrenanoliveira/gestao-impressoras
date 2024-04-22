import { Injectable } from '@nestjs/common'

import { ComputersRepository } from '@/domain/it-manager/application/repositories/computers-repository'
import { FetchComputersUseCase } from '@/domain/it-manager/application/use-cases/computer/fetch-computers'

@Injectable()
export class FetchComputersUseCaseAdapter extends FetchComputersUseCase {
  constructor(computersRepository: ComputersRepository) {
    super(computersRepository)
  }
}
