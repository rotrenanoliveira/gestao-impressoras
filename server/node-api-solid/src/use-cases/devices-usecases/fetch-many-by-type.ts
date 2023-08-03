import { DevicesRepository } from '@/repositories/devices-repository'

export class FetchManyDevicesByTypeUseCase {
  constructor(private devicesRepository: DevicesRepository) {}

  async execute(type: string): Promise<{ devices: Device[] }> {
    const devices = await this.devicesRepository.findManyByType(type)

    return { devices }
  }
}
