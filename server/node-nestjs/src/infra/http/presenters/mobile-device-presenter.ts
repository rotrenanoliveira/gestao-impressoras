import { MobileDevice } from '@/domain/it-manager/enterprise/entities/mobile-device'

export class MobileDevicePresenter {
  static toHTTP(mobileDevice: MobileDevice) {
    return {
      id: mobileDevice.id.toString(),
      serialNumber: mobileDevice.serialNumber,
      model: mobileDevice.model,
      invoice: mobileDevice.invoice,
      purchaseDate: mobileDevice.purchaseDate,
      name: mobileDevice.name,
      type: mobileDevice.type,
      assetTag: mobileDevice.assetTag,
      serviceNumber: mobileDevice.serviceNumber,
      serviceCompany: mobileDevice.serviceCompany,
      operatingSystem: mobileDevice.operatingSystem,
      warrantyEndDate: mobileDevice.warrantyEndDate,
      contractId: mobileDevice.contractId?.toString(),
      departmentId: mobileDevice.departmentId?.toString(),
    }
  }
}
