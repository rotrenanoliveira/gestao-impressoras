import { Printer as PrismaPrinter, Prisma } from '@prisma/client'
import { z } from 'zod'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Printer } from '@/domain/it-manager/enterprise/entities/printer'

export class PrismaPrinterMapper {
  static toDomain(raw: PrismaPrinter): Printer {
    const contractId = raw.contractId ? new UniqueEntityID(raw.contractId) : null

    const colorMode = z
      .union([z.literal('BLACK_WHITE'), z.literal('COLOR')])
      .transform((value) => value.toLowerCase())
      .transform((value) => (value === 'COLOR' ? 'color' : 'black-and-white'))
      .parse(raw.colorMode)

    const printingType = z
      .union([z.literal('LASER'), z.literal('INKJET'), z.literal('DOT_MATRIX'), z.literal('THERMAL')])
      .transform((value) => value.toLowerCase() as 'laser' | 'inkjet' | 'dot-matrix' | 'thermal')
      .parse(raw.printingType)

    return Printer.create(
      {
        name: raw.name,
        ipAddress: raw.ipAddress,
        serialNumber: raw.serialNumber,
        model: raw.model,
        invoice: raw.invoice,
        assetTag: raw.assetTag,
        purchaseDate: raw.purchaseDate,
        warrantyEndDate: raw.warrantyEndDate,
        obs: raw.obs,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        printingType,
        contractId,
        colorMode,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(printer: Printer): Prisma.PrinterUncheckedCreateInput {
    const colorMode = z
      .union([z.literal('black-and-white'), z.literal('color')])
      .refine((value) => value === 'black-and-white' || value === 'color')
      .transform((value) => (value === 'color' ? 'COLOR' : 'BLACK_WHITE'))
      .parse(printer.colorMode)

    const printingType = z
      .union([z.literal('laser'), z.literal('inkjet'), z.literal('dot-matrix'), z.literal('thermal')])
      .transform((value) => value.toUpperCase() as 'LASER' | 'INKJET' | 'DOT_MATRIX' | 'THERMAL')
      .parse(printer.printingType)

    return {
      id: printer.id.toString(),
      name: printer.name,
      ipAddress: printer.ipAddress,
      serialNumber: printer.serialNumber,
      model: printer.model,
      invoice: printer.invoice,
      assetTag: printer.assetTag,
      purchaseDate: printer.purchaseDate,
      warrantyEndDate: printer.warrantyEndDate,
      obs: printer.obs,
      createdAt: printer.createdAt,
      printingType,
      colorMode,
    }
  }
}
