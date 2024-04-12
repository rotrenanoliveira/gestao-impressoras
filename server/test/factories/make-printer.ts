import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Printer, PrinterProps } from '@/domain/it-manager/enterprise/entities/printer'
import { faker } from '@faker-js/faker'

export function makePrinter(override: Partial<PrinterProps> = {}, id?: UniqueEntityID) {
  const device = {
    contractId: new UniqueEntityID(),
    serialNumber: faker.number.int().toString(),
    model: faker.commerce.productName(),
    invoice: faker.number.int().toString(),
    assetTag: faker.number.int().toString(),
    purchaseDate: faker.date.recent(),
    warrantyEndDate: faker.date.future(),
  }

  const printer = Printer.create(
    {
      colorMode: 'black-and-white',
      printingType: 'inkjet',
      name: faker.commerce.productName(),
      ipAddress: faker.internet.ip(),
      obs: faker.lorem.words(10),
      ...device,
      ...override,
    },
    id,
  )

  return printer
}
