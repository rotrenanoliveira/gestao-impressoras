import { Injectable } from '@nestjs/common'

import { ComputersRepository } from '@/domain/it-manager/application/repositories/computers-repository'
import { DeleteComputerUseCase } from '@/domain/it-manager/application/use-cases/computer/delete-computer'

@Injectable()
export class DeleteComputerUseCaseAdapter extends DeleteComputerUseCase {
  constructor(computersRepository: ComputersRepository) {
    super(computersRepository)
  }
}
