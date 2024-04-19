import { BadRequestException, Body, Controller, HttpCode, Param, Patch } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { EditLicenseCostUseCaseAdapter } from './adapters/edit-license-cost-adapter'

const editLicenseCostBodySchema = z.object({
  value: z.coerce.number(),
  currency: z.string(),
})

type EditLicenseCostBodySchema = z.infer<typeof editLicenseCostBodySchema>

@Controller('/licenses/:id/cost')
export class EditLicenseCostController {
  constructor(private editLicenseCost: EditLicenseCostUseCaseAdapter) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Param('id') licenseId: string,
    @Body(new ZodValidationPipe(editLicenseCostBodySchema)) body: EditLicenseCostBodySchema,
  ) {
    const { value, currency } = body

    const result = await this.editLicenseCost.execute({
      licenseId,
      cost: {
        value,
        currency,
      },
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
