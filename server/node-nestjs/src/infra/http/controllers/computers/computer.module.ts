import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'

import { CreateComputerUseCaseAdapter } from './adapters/create-computer-adapter'
import { DeleteComputerUseCaseAdapter } from './adapters/delete-computer-adapter'
import { EditComputerUseCaseAdapter } from './adapters/edit-computer-adapter'
import { FetchComputersUseCaseAdapter } from './adapters/fetch-computers-adapter'
import { GetComputerByIdUseCaseAdapter } from './adapters/get-computer-by-id-adapter'
import { CreateComputerController } from './create-computer.controller'
import { DeleteComputerController } from './delete-computer.controller'
import { EditComputerController } from './edit-computer.controller'
import { FetchComputersController } from './fetch-computers.controller'
import { GetComputerByIdController } from './get-computer-by-id.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateComputerController,
    DeleteComputerController,
    EditComputerController,
    FetchComputersController,
    GetComputerByIdController,
  ],
  providers: [
    CreateComputerUseCaseAdapter,
    DeleteComputerUseCaseAdapter,
    EditComputerUseCaseAdapter,
    FetchComputersUseCaseAdapter,
    GetComputerByIdUseCaseAdapter,
  ],
})
export class ComputerModule {}
