import { Either, success } from '@/core/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Contract } from '@/domain/it-manager/enterprise/entities/contract'

import { ContractsRepository } from '../../repositories/contracts-repository'

interface CreateContractUseCaseProps {
  description: string
  type: 'rental' | 'loan'
  contactEmail: string
  startAt: Date
  endAt?: Date | null
}

type CreateContractUseCaseResponse = Either<void, { contract: Contract }>

export class CreateContractUseCase implements UseCase {
  constructor(private contractsRepository: ContractsRepository) {}

  async execute({
    description,
    type,
    contactEmail,
    startAt,
    endAt,
  }: CreateContractUseCaseProps): Promise<CreateContractUseCaseResponse> {
    const contract = Contract.create({
      description,
      type,
      contactEmail,
      startAt,
      endAt,
    })

    await this.contractsRepository.create(contract)

    return success({ contract })
  }
}
