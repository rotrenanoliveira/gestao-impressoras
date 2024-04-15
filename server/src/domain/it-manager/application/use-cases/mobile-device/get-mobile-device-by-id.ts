import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { MobileDevice } from '@/domain/it-manager/enterprise/entities/mobile-device'
import { MobileDevicesRepository } from '../../repositories/mobile-devices-repository'

interface GetMobileDeviceByIdUseCaseProps {
  mobileDeviceId: string
}

type GetMobileDeviceByIdUseCaseResponse = Either<ResourceNotFoundError, { mobileDevice: MobileDevice }>

export class GetMobileDeviceByIdUseCase implements UseCase {
  constructor(private mobileDevicesRepository: MobileDevicesRepository) {}

  async execute({ mobileDeviceId }: GetMobileDeviceByIdUseCaseProps): Promise<GetMobileDeviceByIdUseCaseResponse> {
    const mobileDevice = await this.mobileDevicesRepository.findById(mobileDeviceId)

    if (!mobileDevice) {
      return failure(new ResourceNotFoundError(`Mobile device with id ${mobileDeviceId} not found`))
    }

    return success({ mobileDevice })
  }
}
