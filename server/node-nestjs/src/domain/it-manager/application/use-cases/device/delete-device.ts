import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'

import { DevicesRepository } from '../../repositories/devices-repository'

interface DeleteDeviceUseCaseProps {
  deviceId: string
}

type DeleteDeviceUseCaseResponse = Either<ResourceNotFoundError, Record<string, never>>

export class DeleteDeviceUseCase implements UseCase {
  constructor(private devicesRepository: DevicesRepository) {}

  async execute({ deviceId }: DeleteDeviceUseCaseProps): Promise<DeleteDeviceUseCaseResponse> {
    const device = await this.devicesRepository.findById(deviceId)

    if (!device) {
      return failure(new ResourceNotFoundError(`Device with id ${deviceId} not found`))
    }

    await this.devicesRepository.delete(device)

    return success({})
  }
}
