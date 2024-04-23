import { Injectable } from '@nestjs/common'

import { MobileDevicesRepository } from '@/domain/it-manager/application/repositories/mobile-devices-repository'
import { FetchMobileDevicesUseCase } from '@/domain/it-manager/application/use-cases/mobile-device/fetch-mobile-devices'

@Injectable()
export class FetchDeleteMobilesDeviceUseCaseAdapter extends FetchMobileDevicesUseCase {
  constructor(mobileDevicesRepository: MobileDevicesRepository) {
    super(mobileDevicesRepository)
  }
}
