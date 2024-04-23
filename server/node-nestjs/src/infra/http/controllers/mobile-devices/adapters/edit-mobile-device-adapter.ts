import { Injectable } from '@nestjs/common'

import { ContractsRepository } from '@/domain/it-manager/application/repositories/contracts-repository'
import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repository'
import { MobileDevicesRepository } from '@/domain/it-manager/application/repositories/mobile-devices-repository'
import { EditMobileDeviceUseCase } from '@/domain/it-manager/application/use-cases/mobile-device/edit-mobile-device'

@Injectable()
export class EditMobileDeviceUseCaseAdapter extends EditMobileDeviceUseCase {
  constructor(
    mobileDevicesRepository: MobileDevicesRepository,
    contractsRepository: ContractsRepository,
    departmentsRepository: DepartmentsRepository,
  ) {
    super(mobileDevicesRepository, contractsRepository, departmentsRepository)
  }
}
