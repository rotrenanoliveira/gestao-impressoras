import { Injectable } from '@nestjs/common'

import { ContractsRepository } from '@/domain/it-manager/application/repositories/contracts-repository'
import { DevicesRepository } from '@/domain/it-manager/application/repositories/devices-repository'
import { CreateDeviceUseCase } from '@/domain/it-manager/application/use-cases/device/create-device'

@Injectable()
export class CreateDeviceUseCaseAdapter extends CreateDeviceUseCase {
  constructor(devicesRepository: DevicesRepository, contractsRepository: ContractsRepository) {
    super(devicesRepository, contractsRepository)
  }
}
