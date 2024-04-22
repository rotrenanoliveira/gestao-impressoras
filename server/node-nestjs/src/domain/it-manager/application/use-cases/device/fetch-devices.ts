import { Either, success } from '@/core/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

import { DevicesRepository } from '../../repositories/devices-repository'

type FetchDevicesUseCaseResponse = Either<void, { devices: Device<DeviceProps>[] }>

export class FetchDevicesUseCase implements UseCase {
  constructor(private devicesRepository: DevicesRepository) {}

  async execute(): Promise<FetchDevicesUseCaseResponse> {
    const devices = await this.devicesRepository.findMany()

    return success({ devices })
  }
}
