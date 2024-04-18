import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'
import { CreateDepartmentUseCaseAdapter } from './controllers/departments/adapters/create-department-adapter'
import { DeleteDepartmentUseCaseAdapter } from './controllers/departments/adapters/delete-department-adapter'
import { EditDepartmentUseCaseAdapter } from './controllers/departments/adapters/edit-department-adapter'
import { FetchDepartmentsUseCaseAdapter } from './controllers/departments/adapters/fetch-departments-adapter'
import { GetDepartmentBySlugUseCaseAdapter } from './controllers/departments/adapters/get-department-by-slug-adapter'
import { CreatedDepartmentController } from './controllers/departments/create-departments.controller'
import { DeleteDepartmentController } from './controllers/departments/delete-department.controller'
import { EditDepartmentController } from './controllers/departments/edit-department.controller'
import { FetchDepartmentsController } from './controllers/departments/fetch-departments.controller'
import { GetDepartmentBySlugController } from './controllers/departments/get-department-by-slug.controller'
import { UserModule } from './controllers/users/user.module'

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [
    FetchDepartmentsController,
    GetDepartmentBySlugController,
    CreatedDepartmentController,
    EditDepartmentController,
    DeleteDepartmentController,
  ],
  providers: [
    FetchDepartmentsUseCaseAdapter,
    GetDepartmentBySlugUseCaseAdapter,
    CreateDepartmentUseCaseAdapter,
    EditDepartmentUseCaseAdapter,
    DeleteDepartmentUseCaseAdapter,
  ],
})
export class HttpModule {}
