import { Injectable } from '@nestjs/common'

import { ContractsRepository } from '@/domain/it-manager/application/repositories/contracts-repository'
import { DevicesRepository } from '@/domain/it-manager/application/repositories/devices-repository'
import { EditDeviceUseCase } from '@/domain/it-manager/application/use-cases/device/edit-device'

@Injectable()
export class EditDeviceUseCaseAdapter extends EditDeviceUseCase {
  constructor(devicesRepository: DevicesRepository, contractsRepository: ContractsRepository) {
    super(devicesRepository, contractsRepository)
  }
}
