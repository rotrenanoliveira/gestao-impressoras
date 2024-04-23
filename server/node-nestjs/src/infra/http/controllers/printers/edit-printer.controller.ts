import { BadRequestException, Body, Controller, HttpCode, Param, Put } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { EditPrinterUseCaseAdapter } from './adapters/edit-printer-adapter'

const editPrinterBodySchema = z.object({
  name: z.string(),
  model: z.string(),
  ipAddress: z.string().ip({ version: 'v4' }).nullable(),
  contractId: z.string().nullable(),
  warrantyEndDate: z.coerce.date().nullable(),
})

type EditPrinterBodySchema = z.infer<typeof editPrinterBodySchema>

@Controller('/printers/:id')
export class EditePrinterController {
  constructor(private editPrinter: EditPrinterUseCaseAdapter) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('id') printerId: string,
    @Body(new ZodValidationPipe(editPrinterBodySchema)) body: EditPrinterBodySchema,
  ) {
    const { name, model, ipAddress, contractId, warrantyEndDate } = body

    const result = await this.editPrinter.execute({
      printerId,
      name,
      model,
      ipAddress,
      contractId,
      warrantyEndDate,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
