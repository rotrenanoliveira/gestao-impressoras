import { BadRequestException, Body, Controller, HttpCode, Param, Patch } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { EditContractEndDateUseCaseAdapter } from './adapters/edit-contract-end-date-adapter'

const editContractEndDateBodySchema = z.object({
  endAt: z.coerce.date().nullable(),
})

type EditContractEndDateBodySchema = z.infer<typeof editContractEndDateBodySchema>

@Controller('/contracts/:id/end-date')
export class EditContractEndDateController {
  constructor(private editContractEndDateUseCase: EditContractEndDateUseCaseAdapter) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Param('id') contractId: string,
    @Body(new ZodValidationPipe(editContractEndDateBodySchema)) body: EditContractEndDateBodySchema,
  ) {
    const { endAt } = body

    const result = await this.editContractEndDateUseCase.execute({
      contractId,
      endAt,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
