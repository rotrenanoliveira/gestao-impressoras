import { Device, DeviceProps } from '../../enterprise/entities/device'

export interface DevicesRepository {
  findById(deviceId: string): Promise<Device<DeviceProps> | null>
  findMany(): Promise<Device<DeviceProps>[]>

  create(device: Device<DeviceProps>): Promise<void>
  save(device: Device<DeviceProps>): Promise<void>
  delete(deviceId: string): Promise<void>
}
