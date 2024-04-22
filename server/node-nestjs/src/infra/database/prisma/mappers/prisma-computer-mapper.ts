import { Computer as PrismaComputer, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Computer } from '@/domain/it-manager/enterprise/entities/computer'

export class PrismaComputerMapper {
  static toDomain(raw: PrismaComputer): Computer {
    const contractId = raw.contractId ? new UniqueEntityID(raw.contractId) : null

    return Computer.create(
      {
        description: raw.description,
        ipAddress: raw.ipAddress,
        hostname: raw.hostname,
        operatingSystem: raw.operatingSystem,
        serialNumber: raw.serialNumber,
        type: raw.type,
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

  static toPersistence(device: Computer): Prisma.ComputerUncheckedCreateInput {
    const contractId = device.contractId ? device.contractId.toString() : null

    return {
      id: device.id.toString(),
      operatingSystem: device.operatingSystem,
      description: device.description,
      ipAddress: device.ipAddress,
      hostname: device.hostname,
      type: device.type,
      model: device.model,
      invoice: device.invoice,
      assetTag: device.assetTag,
      serialNumber: device.serialNumber,
      purchaseDate: device.purchaseDate,
      warrantyEndDate: device.warrantyEndDate,
      createdAt: device.createdAt,
      contractId,
    }
  }
}
