import { Injectable } from '@nestjs/common'

import { PrintersRepository } from '@/domain/it-manager/application/repositories/printers-repository'
import { Printer } from '@/domain/it-manager/enterprise/entities/printer'

import { PrismaPrinterMapper } from '../mappers/prisma-printer-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaPrintersRepository implements PrintersRepository {
  constructor(private prisma: PrismaService) {}

  async findById(printerId: string): Promise<Printer | null> {
    const printer = await this.prisma.printer.findUnique({
      where: {
        id: printerId,
      },
    })

    if (!printer) {
      return null
    }

    return PrismaPrinterMapper.toDomain(printer)
  }

  async findMany(): Promise<Printer[]> {
    const printers = await this.prisma.printer.findMany()

    return printers.map(PrismaPrinterMapper.toDomain)
  }

  async create(printer: Printer): Promise<void> {
    const data = PrismaPrinterMapper.toPersistence(printer)

    await this.prisma.printer.create({
      data,
    })
  }

  async save(printer: Printer): Promise<void> {
    const data = PrismaPrinterMapper.toPersistence(printer)

    await this.prisma.printer.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(printer: Printer): Promise<void> {
    const data = PrismaPrinterMapper.toPersistence(printer)

    await this.prisma.printer.delete({
      where: {
        id: data.id,
      },
    })
  }
}
