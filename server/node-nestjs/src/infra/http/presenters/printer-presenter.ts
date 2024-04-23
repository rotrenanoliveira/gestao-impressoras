import { Printer } from '@/domain/it-manager/enterprise/entities/printer'

export class PrinterPresenter {
  static toHTTP(printer: Printer) {
    return {
      id: printer.id.toString(),
      name: printer.name,
      ipAddress: printer.ipAddress,
      colorMode: printer.colorMode,
      printingType: printer.printingType,
      serialNumber: printer.serialNumber,
      purchaseDate: printer.purchaseDate,
      warrantyEndDate: printer.warrantyEndDate,
      assetTag: printer.assetTag,
      invoice: printer.invoice,
      model: printer.model,
      contractId: printer.contractId?.toString(),
      obs: printer.obs,
    }
  }
}
