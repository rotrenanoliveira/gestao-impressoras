import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'

import { AddChiefToDepartmentUseCaseAdapter } from './adapters/add-chief-to-department-adapter'
import { CreateDepartmentUseCaseAdapter } from './adapters/create-department-adapter'
import { DeleteDepartmentUseCaseAdapter } from './adapters/delete-department-adapter'
import { EditChiefDepartmentUseCaseAdapter } from './adapters/edit-chief-department-adapter'
import { EditDepartmentUseCaseAdapter } from './adapters/edit-department-adapter'
import { FetchDepartmentsUseCaseAdapter } from './adapters/fetch-departments-adapter'
import { GetDepartmentByIdUseCaseAdapter } from './adapters/get-department-by-id-adapter'
import { GetDepartmentBySlugUseCaseAdapter } from './adapters/get-department-by-slug-adapter'
import { AddChiefToDepartmentController } from './add-chief-to-department.controller'
import { CreatedDepartmentController } from './create-departments.controller'
import { DeleteDepartmentController } from './delete-department.controller'
import { EditChiefDepartmentController } from './edit-chief-department.controller'
import { EditDepartmentController } from './edit-department.controller'
import { FetchDepartmentsController } from './fetch-departments.controller'
import { GetDepartmentBySlugController } from './get-department-by-slug.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    AddChiefToDepartmentController,
    CreatedDepartmentController,
    DeleteDepartmentController,
    EditChiefDepartmentController,
    EditDepartmentController,
    FetchDepartmentsController,
    GetDepartmentBySlugController,
  ],
  providers: [
    AddChiefToDepartmentUseCaseAdapter,
    CreateDepartmentUseCaseAdapter,
    DeleteDepartmentUseCaseAdapter,
    EditChiefDepartmentUseCaseAdapter,
    EditDepartmentUseCaseAdapter,
    FetchDepartmentsUseCaseAdapter,
    GetDepartmentByIdUseCaseAdapter,
    GetDepartmentBySlugUseCaseAdapter,
  ],
})
export class DepartmentModule {}
