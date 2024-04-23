import { Either, success } from '@/core/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Computer } from '@/domain/it-manager/enterprise/entities/computer'

import { ComputersRepository } from '../../repositories/computers-repository'

type FetchComputersUseCaseResponse = Either<void, { computers: Computer[] }>

export class FetchComputersUseCase implements UseCase {
  constructor(private computersRepository: ComputersRepository) {}

  async execute(): Promise<FetchComputersUseCaseResponse> {
    const computers = await this.computersRepository.findMany()

    return success({
      computers,
    })
  }
}
