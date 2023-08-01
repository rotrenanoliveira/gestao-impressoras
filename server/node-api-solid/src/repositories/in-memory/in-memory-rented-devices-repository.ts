import { randomUUID } from 'node:crypto'
import { RentedDevicesRepository } from '../rented-devices-repository'

export class InMemoryRentedDevicesRepository implements RentedDevicesRepository {
  public items: RentedDevice[] = []

  async create(data: RentedDeviceCreateInput): Promise<RentedDevice> {
    const rentedDevice = {
      id: randomUUID(),
      created_at: new Date(),
      device_id: data.device_id,
      supplier: data.supplier,
      rented_in: data.rented_in,
      contract_expiration: data.contract_expiration,
      obs: data.obs,
    }

    this.items.push(rentedDevice)

    return rentedDevice
  }
}
