import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'
import { ComputerModule } from './controllers/computers/computer.module'
import { ContractModule } from './controllers/contracts/contract.module'
import { DepartmentModule } from './controllers/departments/department.module'
import { DeviceModule } from './controllers/devices/device.module'
import { LicenseModule } from './controllers/licenses/license.module'
import { MobileDeviceModule } from './controllers/mobile-devices/mobile-device.module'
import { PrinterModule } from './controllers/printers/printer.module'
import { UserLicenseModule } from './controllers/user-licenses/user-license.module'
import { UserModule } from './controllers/users/user.module'
import { WorkstationModule } from './controllers/workstations/workstation.module'

@Module({
  imports: [
    DatabaseModule,
    ComputerModule,
    ContractModule,
    DepartmentModule,
    DeviceModule,
    LicenseModule,
    MobileDeviceModule,
    UserLicenseModule,
    UserModule,
    PrinterModule,
    WorkstationModule,
  ],
})
export class HttpModule {}
