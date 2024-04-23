import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'

import { CreateContractUseCaseAdapter } from './adapters/create-contract-adapter'
import { DeleteContractUseCaseAdapter } from './adapters/delete-contract-adapter'
import { EditContractUseCaseAdapter } from './adapters/edit-contract-adapter'
import { EditContractEndDateUseCaseAdapter } from './adapters/edit-contract-end-date-adapter'
import { GetContractByIdUseCaseAdapter } from './adapters/get-contract-by-id-adapter'
import { CreateContractController } from './create-contract.controller'
import { DeleteContractController } from './delete-contract.controller'
import { EditContractController } from './edit-contract.controller'
import { EditContractEndDateController } from './edit-contract-end-date.controller'
import { GetContractByIdController } from './get-contract-by-id.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateContractController,
    DeleteContractController,
    EditContractController,
    EditContractEndDateController,
    GetContractByIdController,
  ],
  providers: [
    CreateContractUseCaseAdapter,
    DeleteContractUseCaseAdapter,
    EditContractUseCaseAdapter,
    EditContractEndDateUseCaseAdapter,
    GetContractByIdUseCaseAdapter,
  ],
})
export class ContractModule {}
