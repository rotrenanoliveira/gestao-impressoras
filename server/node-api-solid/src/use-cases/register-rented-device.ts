import { DevicesRepository } from '@/repositories/devices-repository'
import { RentedDevicesRepository } from '@/repositories/rented-devices-repository'
import { ResourceNotFound } from './errors/resource-not-found'

export class RegisterRentedDeviceUseCase {
  constructor(
    private rentedDevicesRepository: RentedDevicesRepository,
    private devicesRepository: DevicesRepository,
  ) {}

  async execute({ device_id, supplier, rented_in, contract_expiration, obs }: RentedDeviceCreateInput): Promise<void> {
    const device = await this.devicesRepository.findById(device_id)

    if (!device) {
      throw new ResourceNotFound('device')
    }

    await this.rentedDevicesRepository.create({
      device_id,
      supplier,
      rented_in,
      contract_expiration,
      obs,
    })
  }
}
