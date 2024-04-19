import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'
import { DepartmentModule } from './controllers/departments/department.module'
import { LicenseModule } from './controllers/licenses/license.module'
import { UserLicenseModule } from './controllers/user-licenses/user-license.module'
import { UserModule } from './controllers/users/user.module'

@Module({
  imports: [DatabaseModule, DepartmentModule, LicenseModule, UserLicenseModule, UserModule],
})
export class HttpModule {}
