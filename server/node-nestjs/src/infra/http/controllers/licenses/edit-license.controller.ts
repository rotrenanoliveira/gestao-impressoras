import { BadRequestException, Body, Controller, HttpCode, Param, Put } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { EditLicenseUseCaseAdapter } from './adapters/edit-license-adapter'

const licenseCostSchema = z.object({
  value: z.coerce.number(),
  currency: z.string(),
})

const editLicenseBodySchema = z.object({
  name: z.string(),
  quantity: z.coerce.number().int(),
  partner: z.string(),
  cost: licenseCostSchema,
  expiresAt: z.coerce.date().nullable(),
  obs: z.string(),
})

type EditLicenseBodySchema = z.infer<typeof editLicenseBodySchema>

@Controller('/licenses/:id')
export class EditLicenseController {
  constructor(private editLicense: EditLicenseUseCaseAdapter) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('id') licenseId: string,
    @Body(new ZodValidationPipe(editLicenseBodySchema)) body: EditLicenseBodySchema,
  ) {
    const { name, quantity, partner, cost, expiresAt, obs } = body

    const result = await this.editLicense.execute({
      licenseId,
      name,
      quantity,
      partner,
      cost,
      expiresAt,
      obs,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
