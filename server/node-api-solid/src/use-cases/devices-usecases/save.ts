import { DevicesRepository } from '@/repositories/devices-repository'
import { ResourceNotFound } from '../errors/resource-not-found'

export class SaveDeviceUseCase {
  constructor(private devicesRepository: DevicesRepository) {}

  async execute(deviceId: string, data: Partial<Device>): Promise<{ device: Device }> {
    const device = await this.devicesRepository.save(deviceId, { ...data })

    if (!device) {
      throw new ResourceNotFound('device')
    }

    return {
      device,
    }
  }
}
