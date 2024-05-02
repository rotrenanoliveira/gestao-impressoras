import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { Contract } from '@/domain/it-manager/enterprise/entities/contract'

import { ContractsRepository } from '../../repositories/contracts-repository'

interface EditContractUseCaseProps {
  contractId: string
  description: string
  type: 'rental' | 'loan'
  contactEmail: string
}

type EditContractUseCaseResponse = Either<ResourceNotFoundError, { contract: Contract }>

export class EditContractUseCase implements UseCase {
  constructor(private contractsRepository: ContractsRepository) {}

  async execute({
    contractId,
    description,
    type,
    contactEmail,
  }: EditContractUseCaseProps): Promise<EditContractUseCaseResponse> {
    const contract = await this.contractsRepository.findById(contractId)

    if (!contract) {
      return failure(new ResourceNotFoundError(`Contract with id ${contractId} not found`))
    }

    contract.description = description
    contract.type = type
    contract.contactEmail = contactEmail

    await this.contractsRepository.save(contract)

    return success({
      contract,
    })
  }
}
