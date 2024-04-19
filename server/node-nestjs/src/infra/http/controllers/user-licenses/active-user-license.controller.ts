import { BadRequestException, Controller, HttpCode, Param, Patch } from '@nestjs/common'

import { ActiveUserLicenseUseCaseAdapter } from './adapters/active-user-license-adapter'

@Controller('/user-licenses/:id/active')
export class ActiveUserLicenseController {
  constructor(private activeUserLicense: ActiveUserLicenseUseCaseAdapter) {}

  @Patch()
  @HttpCode(204)
  async handle(@Param('id') userLicenseId: string) {
    const result = await this.activeUserLicense.execute({
      userLicenseId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
