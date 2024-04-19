import { BadRequestException, Controller, Get, NotFoundException, Param } from '@nestjs/common'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found'

import { LicensePresenter } from '../../presenters/license-presenter'
import { GetLicenseByIdUseCaseAdapter } from './adapters/get-license-by-id-adapter'

@Controller('/licenses/:id')
export class GetLicenseByIdController {
  constructor(private getLicense: GetLicenseByIdUseCaseAdapter) {}

  @Get()
  async handle(@Param('id') licenseId: string) {
    const result = await this.getLicense.execute({
      licenseId,
    })

    if (result.hasFailed()) {
      const error = result.reason

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(result.reason)
        default:
          throw new BadRequestException(result.reason)
      }
    }

    const license = result.result.license

    return {
      license: LicensePresenter.toHTTP(license),
    }
  }
}
