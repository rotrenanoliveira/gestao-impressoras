import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { LicensePresenter } from '../../presenters/license-presenter'
import { CreateLicenseUseCaseAdapter } from './adapters/create-license-adapter'

const licenseCostSchema = z.object({
  value: z.coerce.number(),
  currency: z.string(),
})

const createLicenseBodySchema = z.object({
  name: z.string(),
  partner: z.string(),
  quantity: z.coerce.number().int(),
  expiresAt: z.coerce.date().nullable(),
  obs: z.string().default(''),
  cost: licenseCostSchema,
})

type CreateLicenseBodySchema = z.infer<typeof createLicenseBodySchema>

@Controller('/licenses')
export class CreateLicenseController {
  constructor(private createLicense: CreateLicenseUseCaseAdapter) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(new ZodValidationPipe(createLicenseBodySchema)) body: CreateLicenseBodySchema) {
    const { name, quantity, partner, cost, expiresAt, obs } = body

    const result = await this.createLicense.execute({
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

    const license = result.result.license

    return {
      license: LicensePresenter.toHTTP(license),
    }
  }
}
