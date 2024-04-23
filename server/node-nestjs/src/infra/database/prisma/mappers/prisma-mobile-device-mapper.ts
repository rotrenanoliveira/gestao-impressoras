import { MobileDevice as PrismaMobileDevice, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { MobileDevice } from '@/domain/it-manager/enterprise/entities/mobile-device'

export class PrismaMobileDeviceMapper {
  static toDomain(raw: PrismaMobileDevice): MobileDevice {
    const contractId = raw.contractId ? new UniqueEntityID(raw.contractId) : null
    const departmentId = raw.departmentId ? new UniqueEntityID(raw.departmentId) : null

    return MobileDevice.create(
      {
        name: raw.name,
        operatingSystem: raw.operatingSystem,
        serviceCompany: raw.serviceCompany,
        serviceNumber: raw.serviceNumber,
        type: raw.type,
        model: raw.model,
        invoice: raw.invoice,
        assetTag: raw.assetTag,
        serialNumber: raw.serialNumber,
        purchaseDate: raw.purchaseDate,
        warrantyEndDate: raw.warrantyEndDate,
        createdAt: raw.createdAt,
        departmentId,
        contractId,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(mobileDevice: MobileDevice): Prisma.MobileDeviceUncheckedCreateInput {
    const contractId = mobileDevice.contractId ? mobileDevice.contractId.toString() : null
    const departmentId = mobileDevice.departmentId ? mobileDevice.departmentId.toString() : null

    return {
      id: mobileDevice.id.toString(),
      name: mobileDevice.name,
      operatingSystem: mobileDevice.operatingSystem,
      serviceCompany: mobileDevice.serviceCompany,
      serviceNumber: mobileDevice.serviceNumber,
      type: mobileDevice.type,
      model: mobileDevice.model,
      invoice: mobileDevice.invoice,
      assetTag: mobileDevice.assetTag,
      serialNumber: mobileDevice.serialNumber,
      purchaseDate: mobileDevice.purchaseDate,
      warrantyEndDate: mobileDevice.warrantyEndDate,
      createdAt: mobileDevice.createdAt,
      departmentId,
      contractId,
    }
  }
}
