import { UseCase } from '@/core/use-cases/use-case'
import { ContractsRepository } from '../../repositories/contracts-repository'
import { Contract } from '@/domain/it-manager/enterprise/entities/contract'
import { Either, success } from '@/core/either'

interface RegisterContractUseCaseProps {
  description: string
  type: 'rental' | 'loan'
  contactEmail: string
  startAt: Date
  endAt?: Date | null
}

type RegisterContractUseCaseResponse = Either<void, { contract: Contract }>

export class RegisterContractUseCase implements UseCase {
  constructor(private contractsRepository: ContractsRepository) {}

  async execute({
    description,
    type,
    contactEmail,
    startAt,
    endAt,
  }: RegisterContractUseCaseProps): Promise<RegisterContractUseCaseResponse> {
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
