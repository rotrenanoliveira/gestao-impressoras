import { MobileDevicesRepository } from '@/domain/it-manager/application/repositories/mobile-devices-repository'
import { MobileDevice } from '@/domain/it-manager/enterprise/entities/mobile-device'

export class InMemoryMobileDevicesRepository implements MobileDevicesRepository {
  public items: MobileDevice[] = []

  async findById(mobileDeviceId: string): Promise<MobileDevice | null> {
    const mobile = this.items.find((item) => item.id.toString() === mobileDeviceId)

    return mobile ?? null
  }

  async findMany(): Promise<MobileDevice[]> {
    const mobileDevices = this.items

    return mobileDevices
  }

  async create(mobileDevice: MobileDevice): Promise<void> {
    this.items.push(mobileDevice)
  }

  async save(mobileDevice: MobileDevice): Promise<void> {
    const mobileDeviceIndex = this.items.findIndex((item) => item.equals(mobileDevice))

    this.items[mobileDeviceIndex] = mobileDevice
  }

  async delete(mobileDevice: MobileDevice): Promise<void> {
    const mobileDeviceIndex = this.items.findIndex((item) => item.equals(mobileDevice))

    this.items.splice(mobileDeviceIndex, 1)
  }
}
