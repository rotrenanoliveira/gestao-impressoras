import { Computer } from '@/domain/it-manager/enterprise/entities/computer'

export class ComputerPresenter {
  static toHTTP(computer: Computer) {
    return {
      id: computer.id.toString(),
      contractId: computer.contractId?.toString(),
      hostname: computer.hostname,
      ipAddress: computer.ipAddress,
      description: computer.description,
      operatingSystem: computer.operatingSystem,
      warrantyEndDate: computer.warrantyEndDate,
      serialNumber: computer.serialNumber,
      purchaseDate: computer.purchaseDate,
      assetTag: computer.assetTag,
      invoice: computer.invoice,
      model: computer.model,
      type: computer.type,
    }
  }
}
