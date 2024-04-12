import { Either, success } from '@/core/either'
import { UseCase } from '@/core/use-cases/use-case'
import { ComputersRepository } from '../../repositories/computers-repository'
import { Computer } from '@/domain/it-manager/enterprise/entities/computer'

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
