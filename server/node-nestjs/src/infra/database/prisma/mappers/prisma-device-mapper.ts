import { Device as PrismaDevice, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

export class PrismaDeviceMapper {
  static toDomain(raw: PrismaDevice): Device<DeviceProps> {
    const contractId = raw.contractId ? new UniqueEntityID(raw.contractId) : null

    return Device.create(
      {
        serialNumber: raw.serialNumber,
        model: raw.model,
        invoice: raw.invoice,
        assetTag: raw.assetTag,
        purchaseDate: raw.purchaseDate,
        warrantyEndDate: raw.warrantyEndDate,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        contractId,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(device: Device<DeviceProps>): Prisma.DeviceUncheckedCreateInput {
    const contractId = device.contractId ? device.contractId.toString() : null

    return {
      id: device.id.toString(),
      serialNumber: device.serialNumber,
      model: device.model,
      invoice: device.invoice,
      assetTag: device.assetTag,
      purchaseDate: device.purchaseDate,
      warrantyEndDate: device.warrantyEndDate,
      createdAt: device.createdAt,
      contractId,
    }
  }
}
