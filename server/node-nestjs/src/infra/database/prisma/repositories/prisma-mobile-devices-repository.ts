import { Injectable } from '@nestjs/common'

import { MobileDevicesRepository } from '@/domain/it-manager/application/repositories/mobile-devices-repository'
import { MobileDevice } from '@/domain/it-manager/enterprise/entities/mobile-device'

@Injectable()
export class PrismaMobileDevicesRepository implements MobileDevicesRepository {
  findById(mobileDeviceId: string): Promise<MobileDevice | null> {
    throw new Error('Method not implemented.')
  }

  findMany(): Promise<MobileDevice[]> {
    throw new Error('Method not implemented.')
  }

  create(mobileDevice: MobileDevice): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(mobileDevice: MobileDevice): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(mobileDeviceId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
