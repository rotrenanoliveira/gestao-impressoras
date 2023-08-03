import { DevicesRepository } from '@/repositories/devices-repository'

export class RegisterDeviceUseCase {
  constructor(private devicesRepository: DevicesRepository) {}

  async execute({
    name,
    type,
    status,
    supplier,
    acquisition_type,
    contract_expiration,
    description,
    rented_in,
    obs,
  }: DeviceCreateInput): Promise<{ device: Device }> {
    const device = await this.devicesRepository.create({
      name,
      type,
      status,
      supplier,
      acquisition_type,
      contract_expiration,
      description,
      rented_in,
      obs,
    })

    return { device }
  }
}
