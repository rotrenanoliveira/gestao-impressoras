import { BadRequestException, Body, Controller, HttpCode, Param, Put } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { EditContractUseCaseAdapter } from './adapters/edit-contract-adapter'

const editContractBodySchema = z.object({
  description: z.string(),
  type: z.union([z.literal('rental'), z.literal('loan')]),
  contactEmail: z.string().email(),
  endAt: z.coerce.date().nullable(),
})

type EditContractBodySchema = z.infer<typeof editContractBodySchema>

@Controller('/contracts/:id')
export class EditContractController {
  constructor(private editContract: EditContractUseCaseAdapter) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('id') contractId: string,
    @Body(new ZodValidationPipe(editContractBodySchema)) body: EditContractBodySchema,
  ) {
    const { description, type, contactEmail, endAt } = body

    const result = await this.editContract.execute({
      contractId,
      description,
      contactEmail,
      endAt,
      type,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
