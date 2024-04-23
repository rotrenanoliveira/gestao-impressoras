import { Either, success } from '@/core/either'
import { UseCase } from '@/core/use-cases/use-case'
import { MobileDevice } from '@/domain/it-manager/enterprise/entities/mobile-device'

import { MobileDevicesRepository } from '../../repositories/mobile-devices-repository'

type FetchMobileDevicesUseCaseResponse = Either<void, { mobileDevices: MobileDevice[] }>

export class FetchMobileDevicesUseCase implements UseCase {
  constructor(private mobileDevicesRepository: MobileDevicesRepository) {}

  async execute(): Promise<FetchMobileDevicesUseCaseResponse> {
    const mobileDevices = await this.mobileDevicesRepository.findMany()

    return success({
      mobileDevices,
    })
  }
}
