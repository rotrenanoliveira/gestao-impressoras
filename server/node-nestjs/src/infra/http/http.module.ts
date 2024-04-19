import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'
import { DepartmentModule } from './controllers/departments/department.module'
import { UserModule } from './controllers/users/user.module'

@Module({
  imports: [DatabaseModule, DepartmentModule, UserModule],
})
export class HttpModule {}
