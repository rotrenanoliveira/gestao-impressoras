import { DevicesRepository } from '@/repositories/devices-repository'

export class FetchAllDevicesUseCase {
  constructor(private devicesRepository: DevicesRepository) {}

  async execute(): Promise<{ devices: Device[] }> {
    const devices = await this.devicesRepository.findMany()

    return { devices }
  }
}
