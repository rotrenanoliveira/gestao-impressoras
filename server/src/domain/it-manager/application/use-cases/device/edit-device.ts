import { UseCase } from '@/core/use-cases/use-case'
import { DevicesRepository } from '../../repositories/devices-repository'
import { ContractsRepository } from '../../repositories/contracts-repository'
import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface EditDeviceUseCaseProps {
  deviceId: string
  model: string
  contractId: string | null
  warrantyEndDate: Date | null
}

type EditDeviceUseCaseResponse = Either<ResourceNotFoundError, { device: Device<DeviceProps> }>

export class EditDeviceUseCase implements UseCase {
  constructor(
    private devicesRepository: DevicesRepository,
    private contractsRepository: ContractsRepository,
  ) {}

  async execute({
    deviceId,
    model,
    contractId,
    warrantyEndDate,
  }: EditDeviceUseCaseProps): Promise<EditDeviceUseCaseResponse> {
    const device = await this.devicesRepository.findById(deviceId)

    if (!device) {
      return failure(new ResourceNotFoundError(`Device with id ${deviceId} not found`))
    }

    if (contractId) {
      const contract = await this.contractsRepository.findById(contractId)

      if (!contract) {
        return failure(new ResourceNotFoundError(`Contract with id ${contractId} not found`))
      }
    }

    device.model = model
    device.contractId = contractId ? new UniqueEntityID(contractId) : null
    device.warrantyEndDate = warrantyEndDate

    await this.devicesRepository.save(device)

    return success({ device })
  }
}
