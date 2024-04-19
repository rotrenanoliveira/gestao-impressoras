import { BadRequestException, Controller, Delete, HttpCode, Param } from '@nestjs/common'

import { DeleteLicenseUseCaseAdapter } from './adapters/delete-license-adapter'

@Controller('/licenses/:id')
export class DeleteLicenseController {
  constructor(private deleteLicense: DeleteLicenseUseCaseAdapter) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') licenseId: string) {
    const result = await this.deleteLicense.execute({
      licenseId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
