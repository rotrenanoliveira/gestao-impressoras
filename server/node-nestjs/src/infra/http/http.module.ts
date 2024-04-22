import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'
import { ComputerModule } from './controllers/computers/computer.module'
import { ContractModule } from './controllers/contracts/contract.module'
import { DepartmentModule } from './controllers/departments/department.module'
import { DeviceModule } from './controllers/devices/device.module'
import { LicenseModule } from './controllers/licenses/license.module'
import { UserLicenseModule } from './controllers/user-licenses/user-license.module'
import { UserModule } from './controllers/users/user.module'

@Module({
  imports: [
    DatabaseModule,
    ComputerModule,
    ContractModule,
    DepartmentModule,
    DeviceModule,
    LicenseModule,
    UserLicenseModule,
    UserModule,
  ],
})
export class HttpModule {}
