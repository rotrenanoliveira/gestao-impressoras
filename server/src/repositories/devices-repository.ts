export interface DevicesRepository {
  create(data: DeviceCreateInput): Promise<Device>

  findById(deviceId: string): Promise<Device | null>

  save(deviceId: string, rawData: Partial<Device>): Promise<Device | null>

  remove(deviceId: string): Promise<Device | null>
}
