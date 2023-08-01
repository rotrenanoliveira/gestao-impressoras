export interface RentedDevicesRepository {
  create(data: RentedDeviceCreateInput): Promise<RentedDevice>
}
