import { Injectable } from '@nestjs/common'

import { DevicesRepository } from '@/domain/it-manager/application/repositories/devices-repository'
import { FetchDevicesUseCase } from '@/domain/it-manager/application/use-cases/device/fetch-devices'

@Injectable()
export class FetchDevicesUseCaseAdapter extends FetchDevicesUseCase {
  constructor(devicesRepository: DevicesRepository) {
    super(devicesRepository)
  }
}
