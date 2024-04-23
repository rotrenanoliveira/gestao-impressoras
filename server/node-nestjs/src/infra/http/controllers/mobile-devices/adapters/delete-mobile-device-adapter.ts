import { Injectable } from '@nestjs/common'

import { MobileDevicesRepository } from '@/domain/it-manager/application/repositories/mobile-devices-repository'
import { DeleteMobileDeviceUseCase } from '@/domain/it-manager/application/use-cases/mobile-device/delete-mobile-device'

@Injectable()
export class DeleteMobileDeviceUseCaseAdapter extends DeleteMobileDeviceUseCase {
  constructor(mobileDevicesRepository: MobileDevicesRepository) {
    super(mobileDevicesRepository)
  }
}
