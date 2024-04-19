import { BadRequestException, Controller, Get } from '@nestjs/common'

import { UserLicensePresenter } from '../../presenters/user-license-presenter'
import { FetchUserLicensesUseCaseAdapter } from './adapters/fetch-user-licenses-adapter'

@Controller('/user-licenses')
export class FetchUserLicensesController {
  constructor(private fetchUserLicenses: FetchUserLicensesUseCaseAdapter) {}

  @Get()
  async handle() {
    const result = await this.fetchUserLicenses.execute()

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }

    const userLicenses = result.result.userLicenses

    return {
      userLicenses: userLicenses.map(UserLicensePresenter.toHTTP),
    }
  }
}
