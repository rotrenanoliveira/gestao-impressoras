import { UseCase } from '@/core/use-cases/use-case'
import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { Computer } from '@/domain/it-manager/enterprise/entities/computer'
import { ComputersRepository } from '../../repositories/computers-repository'

interface GetComputerByIdUseCaseProps {
  computerId: string
}

type GetComputerByIdUseCaseResponse = Either<ResourceNotFoundError, { computer: Computer }>

export class GetComputerByIdUseCase implements UseCase {
  constructor(private computersRepository: ComputersRepository) {}

  async execute({ computerId }: GetComputerByIdUseCaseProps): Promise<GetComputerByIdUseCaseResponse> {
    const computer = await this.computersRepository.findById(computerId)

    if (!computer) {
      return failure(new ResourceNotFoundError(`Computer with id ${computerId} not found`))
    }

    return success({
      computer,
    })
  }
}
