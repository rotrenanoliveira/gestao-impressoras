import { Injectable } from '@nestjs/common'

import { DevicesRepository } from '@/domain/it-manager/application/repositories/devices-repository'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

@Injectable()
export class PrismaDevicesRepository implements DevicesRepository {
  findById(deviceId: string): Promise<Device<DeviceProps> | null> {
    throw new Error('Method not implemented.')
  }

  findMany(): Promise<Device<DeviceProps>[]> {
    throw new Error('Method not implemented.')
  }

  create(device: Device<DeviceProps>): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(device: Device<DeviceProps>): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(deviceId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
