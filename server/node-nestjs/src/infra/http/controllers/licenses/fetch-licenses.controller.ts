import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { LicensePresenter } from '../../presenters/license-presenter'
import { FetchLicensesUseCaseAdapter } from './adapters/fetch-licenses-adapter'
import { FetchLicensesCloseToExpireUseCaseAdapter } from './adapters/fetch-licenses-close-to-expire-adapter'

const fetchLicensesQuerySchema = z.object({
  q: z.literal('expiring_soon').optional().nullable(),
})

type FetchLicensesQuery = z.infer<typeof fetchLicensesQuerySchema>

@Controller('/licenses')
export class FetchLicensesController {
  constructor(
    private fetchLicenses: FetchLicensesUseCaseAdapter,
    private fetchLicensesExpiringSoon: FetchLicensesCloseToExpireUseCaseAdapter,
  ) {}

  @Get()
  async handle(@Query(new ZodValidationPipe(fetchLicensesQuerySchema)) query: FetchLicensesQuery) {
    const { q } = query

    const fetchLicenses = !q
      ? this.fetchLicenses
      : q === 'expiring_soon'
        ? this.fetchLicensesExpiringSoon
        : this.fetchLicenses

    const result = await fetchLicenses.execute()

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }

    const licenses = result.result.licenses

    return {
      licenses: licenses.map(LicensePresenter.toHTTP),
    }
  }
}
