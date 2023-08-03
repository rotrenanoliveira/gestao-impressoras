import { DevicesRepository } from '@/repositories/devices-repository'
import { ResourceNotFound } from '../errors/resource-not-found'

export class RemoveDeviceUseCase {
  constructor(private devicesRepository: DevicesRepository) {}

  async execute(deviceId: string) {
    const device = await this.devicesRepository.findById(deviceId)

    if (!device) {
      throw new ResourceNotFound('device')
    }

    await this.devicesRepository.remove(deviceId)
  }
}
