import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'

import { CreateWorkstationUseCaseAdapter } from './adapters/create-workstation-adapter'
import { DeleteWorkstationUseCaseAdapter } from './adapters/delete-workstation-adapter'
import { FetchWorkstationsUseCaseAdapter } from './adapters/fetch-workstations-adapter'
import { FetchWorkstationsByIdUseCaseAdapter } from './adapters/fetch-workstations-by-departments-adapter'
import { GetWorkstationByIdUseCaseAdapter } from './adapters/get-workstation-by-id-adapter'
import { CreateWorkstationController } from './create-workstation.controller'
import { DeleteWorkstationController } from './delete-workstation.controller'
import { FetchWorkstationsController } from './fetch-workstations.controller'
import { GetWorkstationByIdController } from './get-workstation-by-id.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateWorkstationController,
    DeleteWorkstationController,
    FetchWorkstationsController,
    GetWorkstationByIdController,
  ],
  providers: [
    CreateWorkstationUseCaseAdapter,
    DeleteWorkstationUseCaseAdapter,
    FetchWorkstationsUseCaseAdapter,
    FetchWorkstationsByIdUseCaseAdapter,
    GetWorkstationByIdUseCaseAdapter,
  ],
})
export class WorkstationModule {}
