import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

export class DevicePresenter {
  static toHTTP(device: Device<DeviceProps>) {
    return {
      id: device.id.toString(),
      serialNumber: device.serialNumber,
      model: device.model,
      invoice: device.invoice,
      assetTag: device.assetTag,
      purchaseDate: device.purchaseDate,
      warrantyEndDate: device.warrantyEndDate,
      contractId: device.contractId?.toString(),
    }
  }
}
