import { Either, failure, success } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { Computer } from '@/domain/it-manager/enterprise/entities/computer'
import { ComputersRepository } from '../../repositories/computers-repository'
import { ContractsRepository } from '../../repositories/contracts-repository'

interface EditComputerUseCaseProps {
  computerId: string
  hostname: string
  ipAddress: string | 'dynamic'
  operatingSystem: string
  model: string
  description: string
  warrantyEndDate: Date | null
  contractId: string | null
}

type EditComputerUseCaseResponse = Either<ResourceNotFoundError, { computer: Computer }>

export class EditComputerUseCase implements UseCase {
  constructor(
    private computersRepository: ComputersRepository,
    private contractsRepository: ContractsRepository,
  ) {}

  async execute({ computerId, ...props }: EditComputerUseCaseProps): Promise<EditComputerUseCaseResponse> {
    if (props.contractId) {
      const contract = await this.contractsRepository.findById(props.contractId)

      if (!contract) {
        return failure(new ResourceNotFoundError(`Contract with id ${props.contractId} not found`))
      }
    }

    const computer = await this.computersRepository.findById(computerId)

    if (!computer) {
      return failure(new ResourceNotFoundError(`Computer with id ${computerId} not found`))
    }

    computer.hostname = props.hostname
    computer.ipAddress = props.ipAddress
    computer.operatingSystem = props.operatingSystem
    computer.model = props.model
    computer.description = props.description
    computer.warrantyEndDate = props.warrantyEndDate
    computer.contractId = props.contractId ? new UniqueEntityID(props.contractId) : null

    await this.computersRepository.save(computer)

    return success({
      computer,
    })
  }
}
