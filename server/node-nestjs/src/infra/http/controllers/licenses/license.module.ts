import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'

import { CreateLicenseUseCaseAdapter } from './adapters/create-license-adapter'
import { DeleteLicenseUseCaseAdapter } from './adapters/delete-license-adapter'
import { EditLicenseUseCaseAdapter } from './adapters/edit-license-adapter'
import { EditLicenseCostUseCaseAdapter } from './adapters/edit-license-cost-adapter'
import { EditLicenseExpireDateUseCaseAdapter } from './adapters/edit-license-expire-date-adapter'
import { FetchLicensesUseCaseAdapter } from './adapters/fetch-licenses-adapter'
import { FetchLicensesCloseToExpireUseCaseAdapter } from './adapters/fetch-licenses-close-to-expire-adapter'
import { GetLicenseByIdUseCaseAdapter } from './adapters/get-license-by-id-adapter'
import { CreateLicenseController } from './create-license.controller'
import { DeleteLicenseController } from './delete-license.controller'
import { EditLicenseController } from './edit-license.controller'
import { EditLicenseCostController } from './edit-license-cost.controller'
import { EditLicenseExpireDateController } from './edit-license-expire-date.controller'
import { FetchLicensesController } from './fetch-licenses.controller'
import { GetLicenseByIdController } from './get-license-by-id.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateLicenseController,
    DeleteLicenseController,
    EditLicenseCostController,
    EditLicenseExpireDateController,
    EditLicenseController,
    FetchLicensesController,
    GetLicenseByIdController,
  ],
  providers: [
    // UseCases
    CreateLicenseUseCaseAdapter,
    DeleteLicenseUseCaseAdapter,
    EditLicenseCostUseCaseAdapter,
    EditLicenseExpireDateUseCaseAdapter,
    EditLicenseUseCaseAdapter,
    FetchLicensesUseCaseAdapter,
    FetchLicensesCloseToExpireUseCaseAdapter,
    GetLicenseByIdUseCaseAdapter,
  ],
})
export class LicenseModule {}
