import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

import { DevicesRepository } from '../../repositories/devices-repository'

interface GetDeviceByIdUseCaseProps {
  deviceId: string
}

type GetDeviceByIdUseCaseResponse = Either<ResourceNotFoundError, { device: Device<DeviceProps> }>

export class GetDeviceByIdUseCase implements UseCase {
  constructor(private devicesRepository: DevicesRepository) {}

  async execute({ deviceId }: GetDeviceByIdUseCaseProps): Promise<GetDeviceByIdUseCaseResponse> {
    const device = await this.devicesRepository.findById(deviceId)

    if (!device) {
      return failure(new ResourceNotFoundError(`Device with id ${deviceId} not found`))
    }

    return success({ device })
  }
}
