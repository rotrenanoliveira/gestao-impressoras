import { Device, DeviceProps } from '../../enterprise/entities/device'

export abstract class DevicesRepository {
  abstract findById(deviceId: string): Promise<Device<DeviceProps> | null>
  abstract findMany(): Promise<Device<DeviceProps>[]>

  abstract create(device: Device<DeviceProps>): Promise<void>
  abstract save(device: Device<DeviceProps>): Promise<void>
  abstract delete(device: Device<DeviceProps>): Promise<void>
}
