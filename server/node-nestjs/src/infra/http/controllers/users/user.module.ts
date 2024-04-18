import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'

import { ActiveUserController } from './active-user.controller'
import { ActiveUserUseCaseAdapter } from './adapters/active-user-adapter'
import { CreateUserUseCaseAdapter } from './adapters/create-user-adapter'
import { EditUserUseCaseAdapter } from './adapters/edit-user-adapter'
import { EditUserDepartmentUseCaseAdapter } from './adapters/edit-user-department-adapter'
import { FetchUsersUseCaseAdapter } from './adapters/fetch-users-adapter'
import { FetchUsersByDepartmentUseCaseAdapter } from './adapters/fetch-users-by-department-adapter'
import { GetUserByIdUseCaseAdapter } from './adapters/get-user-by-id-adapter'
import { InactiveUserUseCaseAdapter } from './adapters/inactive-user-adapter'
import { CreateUserController } from './create-user.controller'
import { EditUserController } from './edit-user.controller'
import { EditUserDepartmentController } from './edit-user-department.controller'
import { FetchUsersController } from './fetch-users.controller'
import { FetchUsersByDepartmentController } from './fetch-users-by-department.controller'
import { GetUserByIdController } from './get-user-by-id.controller'
import { InactiveUserController } from './inactive-user.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    ActiveUserController,
    CreateUserController,
    EditUserDepartmentController,
    EditUserController,
    FetchUsersByDepartmentController,
    FetchUsersController,
    GetUserByIdController,
    InactiveUserController,
  ],
  providers: [
    ActiveUserUseCaseAdapter,
    CreateUserUseCaseAdapter,
    EditUserDepartmentUseCaseAdapter,
    EditUserUseCaseAdapter,
    FetchUsersByDepartmentUseCaseAdapter,
    FetchUsersUseCaseAdapter,
    GetUserByIdUseCaseAdapter,
    InactiveUserUseCaseAdapter,
  ],
})
export class UserModule {}
