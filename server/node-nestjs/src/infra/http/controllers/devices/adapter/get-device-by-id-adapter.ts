import { Injectable } from '@nestjs/common'

import { DevicesRepository } from '@/domain/it-manager/application/repositories/devices-repository'
import { GetDeviceByIdUseCase } from '@/domain/it-manager/application/use-cases/device/get-device-by-id'

@Injectable()
export class GetDeviceByIdUseCaseAdapter extends GetDeviceByIdUseCase {
  constructor(devicesRepository: DevicesRepository) {
    super(devicesRepository)
  }
}
