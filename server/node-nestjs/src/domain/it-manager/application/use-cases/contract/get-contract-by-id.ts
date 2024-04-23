import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { Contract } from '@/domain/it-manager/enterprise/entities/contract'

import { ContractsRepository } from '../../repositories/contracts-repository'

interface GetContractByIdUseCaseProps {
  contractId: string
}

type GetContractByIdUseCaseResponse = Either<ResourceNotFoundError, { contract: Contract }>

export class GetContractByIdUseCase {
  constructor(private contractsRepository: ContractsRepository) {}

  async execute({ contractId }: GetContractByIdUseCaseProps): Promise<GetContractByIdUseCaseResponse> {
    const contract = await this.contractsRepository.findById(contractId)

    if (!contract) {
      return failure(new ResourceNotFoundError(`Contract with id ${contractId} not found`))
    }

    return success({ contract })
  }
}
