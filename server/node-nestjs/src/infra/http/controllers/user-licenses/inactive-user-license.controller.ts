import { BadRequestException, Controller, HttpCode, Param, Patch } from '@nestjs/common'

import { InactiveUserLicenseUseCaseAdapter } from './adapters/inactive-user-license-adapter'

@Controller('/user-licenses/:id/inactive')
export class InactiveUserLicenseController {
  constructor(private inactiveUserLicense: InactiveUserLicenseUseCaseAdapter) {}

  @Patch()
  @HttpCode(204)
  async handle(@Param('id') userLicenseId: string) {
    const result = await this.inactiveUserLicense.execute({
      userLicenseId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
