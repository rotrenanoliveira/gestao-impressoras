export interface DevicesRepository {
  create(data: DeviceCreateInput): Promise<Device>

  findById(device_id: string): Promise<Device | null>
}
