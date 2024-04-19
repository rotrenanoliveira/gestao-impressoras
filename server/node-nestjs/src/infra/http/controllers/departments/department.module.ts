import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'

import { CreateDepartmentUseCaseAdapter } from './adapters/create-department-adapter'
import { DeleteDepartmentUseCaseAdapter } from './adapters/delete-department-adapter'
import { EditDepartmentUseCaseAdapter } from './adapters/edit-department-adapter'
import { FetchDepartmentsUseCaseAdapter } from './adapters/fetch-departments-adapter'
import { GetDepartmentBySlugUseCaseAdapter } from './adapters/get-department-by-slug-adapter'
import { CreatedDepartmentController } from './create-departments.controller'
import { DeleteDepartmentController } from './delete-department.controller'
import { EditDepartmentController } from './edit-department.controller'
import { FetchDepartmentsController } from './fetch-departments.controller'
import { GetDepartmentBySlugController } from './get-department-by-slug.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreatedDepartmentController,
    DeleteDepartmentController,
    EditDepartmentController,
    FetchDepartmentsController,
    GetDepartmentBySlugController,
  ],
  providers: [
    CreateDepartmentUseCaseAdapter,
    DeleteDepartmentUseCaseAdapter,
    EditDepartmentUseCaseAdapter,
    FetchDepartmentsUseCaseAdapter,
    GetDepartmentBySlugUseCaseAdapter,
  ],
})
export class DepartmentModule {}
