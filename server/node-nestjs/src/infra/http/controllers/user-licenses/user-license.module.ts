import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'

import { ActiveUserLicenseController } from './active-user-license.controller'
import { ActiveUserLicenseUseCaseAdapter } from './adapters/active-user-license-adapter'
import { CreateUserLicenseUseCaseAdapter } from './adapters/create-user-license-adapter'
import { DeleteUserLicenseUseCaseAdapter } from './adapters/delete-user-license-adapter'
import { FetchUserLicensesUseCaseAdapter } from './adapters/fetch-user-licenses-adapter'
import { InactiveUserLicenseUseCaseAdapter } from './adapters/inactive-user-license-adapter'
import { CreateUserLicenseController } from './create-user-license.controller'
import { DeleteUserLicenseController } from './delete-user-license.controller'
import { FetchUserLicensesController } from './fetch-user-licenses.controller'
import { InactiveUserLicenseController } from './inactive-user-license.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    ActiveUserLicenseController,
    CreateUserLicenseController,
    DeleteUserLicenseController,
    FetchUserLicensesController,
    InactiveUserLicenseController,
  ],
  providers: [
    ActiveUserLicenseUseCaseAdapter,
    CreateUserLicenseUseCaseAdapter,
    DeleteUserLicenseUseCaseAdapter,
    FetchUserLicensesUseCaseAdapter,
    InactiveUserLicenseUseCaseAdapter,
  ],
})
export class UserLicenseModule {}
