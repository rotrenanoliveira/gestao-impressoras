import { Injectable } from '@nestjs/common'

import { ComputersRepository } from '@/domain/it-manager/application/repositories/computers-repository'
import { GetComputerByIdUseCase } from '@/domain/it-manager/application/use-cases/computer/get-computer-by-id'

@Injectable()
export class GetComputerByIdUseCaseAdapter extends GetComputerByIdUseCase {
  constructor(computersRepository: ComputersRepository) {
    super(computersRepository)
  }
}
