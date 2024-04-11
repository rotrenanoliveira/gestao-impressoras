import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { ContractsRepository } from '../../repositories/contracts-repository'

interface DeleteContractUseCaseProps {
  contractId: string
}

type DeleteContractUseCaseResponse = Either<ResourceNotFoundError, Record<string, never>>

export class DeleteContractUseCase implements UseCase {
  constructor(private contractsRepository: ContractsRepository) {}

  async execute({ contractId }: DeleteContractUseCaseProps): Promise<DeleteContractUseCaseResponse> {
    const contract = await this.contractsRepository.findById(contractId)

    if (!contract) {
      return failure(new ResourceNotFoundError(`Contract with id ${contractId} not found`))
    }

    await this.contractsRepository.delete(contract)

    return success({})
  }
}
