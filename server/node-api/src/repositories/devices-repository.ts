export interface DevicesRepository {
  create(data: DeviceCreateInput): Promise<Device>

  findMany(): Promise<Device[]>
  findManyByType(type: string): Promise<Device[]>
  findById(deviceId: string): Promise<Device | null>

  save(deviceId: string, data: Partial<Device>): Promise<Device | null>

  remove(deviceId: string): Promise<Device | null>
}
