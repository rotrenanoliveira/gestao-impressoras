import { Injectable } from '@nestjs/common'

import { MobileDevicesRepository } from '@/domain/it-manager/application/repositories/mobile-devices-repository'
import { GetMobileDeviceByIdUseCase } from '@/domain/it-manager/application/use-cases/mobile-device/get-mobile-device-by-id'

@Injectable()
export class GetMobileDeviceByIdUseCaseAdapter extends GetMobileDeviceByIdUseCase {
  constructor(mobileDevicesRepository: MobileDevicesRepository) {
    super(mobileDevicesRepository)
  }
}
