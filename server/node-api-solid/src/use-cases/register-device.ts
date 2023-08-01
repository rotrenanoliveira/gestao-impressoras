import { DevicesRepository } from '@/repositories/devices-repository'

interface RegisterDevicesUseCaseResponse {
  device: Device
}

export class RegisterDeviceUseCase {
  constructor(private devicesRepository: DevicesRepository) {}

  async execute({
    name,
    type,
    description,
    status,
    acquisition_type,
  }: DeviceCreateInput): Promise<RegisterDevicesUseCaseResponse> {
    const device = await this.devicesRepository.create({
      name,
      type,
      status,
      description,
      acquisition_type,
    })

    return { device }
  }
}
