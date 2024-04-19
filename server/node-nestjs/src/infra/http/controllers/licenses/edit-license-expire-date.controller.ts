import { BadRequestException, Body, Controller, HttpCode, Param, Patch } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { EditLicenseExpireDateUseCaseAdapter } from './adapters/edit-license-expire-date-adapter'

const editLicenseExpireDateBodySchema = z.object({
  expiresAt: z.coerce.date().nullable(),
})

type EditLicenseExpireDateBodySchema = z.infer<typeof editLicenseExpireDateBodySchema>

@Controller('/licenses/:id/expire-date')
export class EditLicenseExpireDateController {
  constructor(private editLicenseExpireDate: EditLicenseExpireDateUseCaseAdapter) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Param('id') licenseId: string,
    @Body(new ZodValidationPipe(editLicenseExpireDateBodySchema)) body: EditLicenseExpireDateBodySchema,
  ) {
    const { expiresAt } = body

    const result = await this.editLicenseExpireDate.execute({
      licenseId,
      expiresAt,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
