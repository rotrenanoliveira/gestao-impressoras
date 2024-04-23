import { Either, failure, success } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

import { ContractsRepository } from '../../repositories/contracts-repository'
import { DevicesRepository } from '../../repositories/devices-repository'

interface CreateDeviceUseCaseProps {
  contractId: string | null
  serialNumber: string
  model: string
  invoice: string
  assetTag: string | null
  purchaseDate: Date
  warrantyEndDate: Date | null
}

type CreateDeviceUseCaseResponse = Either<ResourceNotFoundError, { device: Device<DeviceProps> }>

export class CreateDeviceUseCase implements UseCase {
  constructor(
    private devicesRepository: DevicesRepository,
    private contractsRepository: ContractsRepository,
  ) {}

  async execute({
    contractId,
    serialNumber,
    model,
    invoice,
    assetTag,
    purchaseDate,
    warrantyEndDate,
  }: CreateDeviceUseCaseProps): Promise<CreateDeviceUseCaseResponse> {
    if (contractId) {
      const contract = await this.contractsRepository.findById(contractId)

      if (!contract) {
        return failure(new ResourceNotFoundError(`Contract with id ${contractId} not found`))
      }
    }

    const device = Device.create({
      contractId: contractId ? new UniqueEntityID(contractId) : null,
      serialNumber,
      model,
      invoice,
      assetTag,
      purchaseDate,
      warrantyEndDate,
    })

    await this.devicesRepository.create(device)

    return success({ device })
  }
}
