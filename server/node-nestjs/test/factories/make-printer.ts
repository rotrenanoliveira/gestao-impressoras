import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Printer, PrinterProps } from '@/domain/it-manager/enterprise/entities/printer'
import { PrismaPrinterMapper } from '@/infra/database/prisma/mappers/prisma-printer-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

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

@Injectable()
export class PrinterFactory {
  constructor(private prisma: PrismaService) {}

  async makePrinterPrisma(data: Partial<PrinterProps> = {}) {
    const printer = makePrinter(data)

    await this.prisma.printer.create({
      data: PrismaPrinterMapper.toPersistence(printer),
    })

    return printer
  }
}
