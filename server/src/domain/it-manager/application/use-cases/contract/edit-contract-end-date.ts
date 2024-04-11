import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { Contract } from '@/domain/it-manager/enterprise/entities/contract'
import { ContractsRepository } from '../../repositories/contracts-repository'

interface EditContractEndDateUseCaseProps {
  contractId: string
  endAt: Date | null
}

type EditContractEndDateUseCaseResponse = Either<ResourceNotFoundError, { contract: Contract }>

export class EditContractEndDateUseCase {
  constructor(private contractsRepository: ContractsRepository) {}

  async execute({ contractId, endAt }: EditContractEndDateUseCaseProps): Promise<EditContractEndDateUseCaseResponse> {
    const contract = await this.contractsRepository.findById(contractId)

    if (!contract) {
      return failure(new ResourceNotFoundError(`Contract with id ${contractId} not found`))
    }

    contract.endAt = endAt

    await this.contractsRepository.save(contract)

    return success({ contract })
  }
}
