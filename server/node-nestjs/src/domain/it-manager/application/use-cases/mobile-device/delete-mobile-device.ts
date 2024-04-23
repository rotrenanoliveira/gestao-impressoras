import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'

import { MobileDevicesRepository } from '../../repositories/mobile-devices-repository'

interface DeleteMobileDeviceUseCaseProps {
  mobileDeviceId: string
}

type DeleteMobileDeviceUseCaseResponse = Either<ResourceNotFoundError, Record<string, never>>

export class DeleteMobileDeviceUseCase implements UseCase {
  constructor(private mobileDevicesRepository: MobileDevicesRepository) {}

  async execute({ mobileDeviceId }: DeleteMobileDeviceUseCaseProps): Promise<DeleteMobileDeviceUseCaseResponse> {
    const mobileDevice = await this.mobileDevicesRepository.findById(mobileDeviceId)

    if (!mobileDevice) {
      return failure(new ResourceNotFoundError(`Mobile device with id ${mobileDeviceId} not found`))
    }

    await this.mobileDevicesRepository.delete(mobileDevice)

    return success({})
  }
}
