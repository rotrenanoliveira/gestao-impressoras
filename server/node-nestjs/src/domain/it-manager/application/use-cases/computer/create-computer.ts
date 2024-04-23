import { Either, failure, success } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { Computer } from '@/domain/it-manager/enterprise/entities/computer'

import { ComputersRepository } from '../../repositories/computers-repository'
import { ContractsRepository } from '../../repositories/contracts-repository'

interface CreateComputerUseCaseProps {
  hostname: string
  ipAddress: string | 'DYNAMIC'
  operatingSystem: string
  type: 'NOTEBOOK' | 'DESKTOP' | 'SERVER'
  model: string
  serialNumber: string
  invoice: string
  description: string
  assetTag: string | null
  warrantyEndDate: Date | null
  purchaseDate: Date
  contractId: string | null
}

type CreateComputerUseCaseResponse = Either<ResourceNotFoundError, { computer: Computer }>

export class CreateComputerUseCase {
  constructor(
    private computersRepository: ComputersRepository,
    private contractsRepository: ContractsRepository,
  ) {}

  async execute(props: CreateComputerUseCaseProps): Promise<CreateComputerUseCaseResponse> {
    if (props.contractId) {
      const contract = await this.contractsRepository.findById(props.contractId)

      if (!contract) {
        return failure(new ResourceNotFoundError(`Contract with id ${props.contractId} not found`))
      }
    }

    const computer = Computer.create({
      contractId: props.contractId ? new UniqueEntityID(props.contractId) : null,
      hostname: props.hostname,
      ipAddress: props.ipAddress,
      operatingSystem: props.operatingSystem,
      type: props.type,
      model: props.model,
      serialNumber: props.serialNumber,
      invoice: props.invoice,
      description: props.description,
      assetTag: props.assetTag,
      warrantyEndDate: props.warrantyEndDate,
      purchaseDate: props.purchaseDate,
    })

    await this.computersRepository.create(computer)

    return success({ computer })
  }
}
