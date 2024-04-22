import { Injectable } from '@nestjs/common'

import { DevicesRepository } from '@/domain/it-manager/application/repositories/devices-repository'
import { DeleteDeviceUseCase } from '@/domain/it-manager/application/use-cases/device/delete-device'

@Injectable()
export class DeleteDeviceUseCaseAdapter extends DeleteDeviceUseCase {
  constructor(devicesRepository: DevicesRepository) {
    super(devicesRepository)
  }
}
