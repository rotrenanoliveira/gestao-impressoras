import { DevicesRepository } from '@/repositories/devices-repository'
import { ResourceNotFound } from '../errors/resource-not-found'

export class GetDeviceByIdUseCase {
  constructor(private devicesRepository: DevicesRepository) {}

  async execute(deviceId: string): Promise<{ device: Device }> {
    const device = await this.devicesRepository.findById(deviceId)

    if (!device) {
      throw new ResourceNotFound('device')
    }

    return { device }
  }
}
