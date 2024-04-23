import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'

import { AddUserToWorkstationUseCaseAdapter } from './adapters/add-user-to-workstation-adapter'
import { CreateWorkstationUseCaseAdapter } from './adapters/create-workstation-adapter'
import { DeleteWorkstationUseCaseAdapter } from './adapters/delete-workstation-adapter'
import { FetchWorkstationsUseCaseAdapter } from './adapters/fetch-workstations-adapter'
import { FetchWorkstationsByIdUseCaseAdapter } from './adapters/fetch-workstations-by-departments-adapter'
import { GetWorkstationByIdUseCaseAdapter } from './adapters/get-workstation-by-id-adapter'
import { AddUserToWorkstationController } from './add-user-to-workstations.controller'
import { CreateWorkstationController } from './create-workstation.controller'
import { DeleteWorkstationController } from './delete-workstation.controller'
import { FetchWorkstationsController } from './fetch-workstations.controller'
import { GetWorkstationByIdController } from './get-workstation-by-id.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    AddUserToWorkstationController,
    CreateWorkstationController,
    DeleteWorkstationController,
    FetchWorkstationsController,
    GetWorkstationByIdController,
  ],
  providers: [
    AddUserToWorkstationUseCaseAdapter,
    CreateWorkstationUseCaseAdapter,
    DeleteWorkstationUseCaseAdapter,
    FetchWorkstationsUseCaseAdapter,
    FetchWorkstationsByIdUseCaseAdapter,
    GetWorkstationByIdUseCaseAdapter,
  ],
})
export class WorkstationModule {}
