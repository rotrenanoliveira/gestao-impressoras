import { MobileDevice } from '../../enterprise/entities/mobile-device'

export interface MobileDevicesRepository {
  findById(mobileDeviceId: string): Promise<MobileDevice | null>
  findMany(): Promise<MobileDevice[]>

  create(mobileDevice: MobileDevice): Promise<void>
  save(mobileDevice: MobileDevice): Promise<void>
  delete(mobileDeviceId: string): Promise<void>
}
