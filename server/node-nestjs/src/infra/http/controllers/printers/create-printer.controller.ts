import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { PrinterPresenter } from '../../presenters/printer-presenter'
import { CreatePrinterUseCaseAdapter } from './adapters/create-printer-adapter'

const createPrinterBodySchema = z.object({
  name: z.string(),
  colorMode: z.union([z.literal('black-and-white'), z.literal('color')]),
  printingType: z.union([z.literal('laser'), z.literal('inkjet'), z.literal('dot-matrix'), z.literal('thermal')]),
  ipAddress: z.string().ip({ version: 'v4' }).optional().nullable(),
  serialNumber: z.string(),
  model: z.string(),
  invoice: z.string(),
  purchaseDate: z.coerce.date(),
  warrantyEndDate: z.coerce.date().nullable(),
  contractId: z.string().uuid().nullable(),
  assetTag: z.string().nullable(),
  obs: z.string().nullable(),
})

type CreatePrinterBodySchema = z.infer<typeof createPrinterBodySchema>

@Controller('/printers')
export class CreatePrinterController {
  constructor(private createPrinter: CreatePrinterUseCaseAdapter) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(new ZodValidationPipe(createPrinterBodySchema)) body: CreatePrinterBodySchema) {
    const result = await this.createPrinter.execute({
      name: body.name,
      colorMode: body.colorMode,
      printingType: body.printingType,
      ipAddress: body.ipAddress,
      serialNumber: body.serialNumber,
      model: body.model,
      invoice: body.invoice,
      purchaseDate: body.purchaseDate,
      warrantyEndDate: body.warrantyEndDate,
      contractId: body.contractId,
      assetTag: body.assetTag,
      obs: body.obs,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }

    const { printer } = result.result

    return {
      printer: PrinterPresenter.toHTTP(printer),
    }
  }
}
