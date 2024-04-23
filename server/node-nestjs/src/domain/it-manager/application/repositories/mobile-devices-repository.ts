import { MobileDevice } from '../../enterprise/entities/mobile-device'

export abstract class MobileDevicesRepository {
  abstract findById(mobileDeviceId: string): Promise<MobileDevice | null>
  abstract findMany(): Promise<MobileDevice[]>

  abstract create(mobileDevice: MobileDevice): Promise<void>
  abstract save(mobileDevice: MobileDevice): Promise<void>
  abstract delete(mobileDevice: MobileDevice): Promise<void>
}
