import { prisma } from '@/lib/prisma'
import { RentedDevicesRepository } from '../rented-devices-repository'

export class PrismaRentedDevicesRepository implements RentedDevicesRepository {
  async create(data: RentedDeviceCreateInput): Promise<RentedDevice> {
    const rentedDevice = await prisma.rentedDevice.create({
      data: {
        device_id: data.device_id,
        supplier: data.supplier,
        rented_in: data.rented_in,
        contract_expiration: data.contract_expiration,
        obs: data.obs,
      },
    })

    return rentedDevice
  }
}
