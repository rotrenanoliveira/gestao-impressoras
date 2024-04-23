import { BadRequestException, Controller, Delete, HttpCode, Param } from '@nestjs/common'

import { DeleteUserLicenseUseCaseAdapter } from './adapters/delete-user-license-adapter'

@Controller('/user-licenses/:id')
export class DeleteUserLicenseController {
  constructor(private deleteUserLicense: DeleteUserLicenseUseCaseAdapter) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') userLicenseId: string) {
    const result = await this.deleteUserLicense.execute({
      userLicenseId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
