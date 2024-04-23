import { Controller, Get, NotFoundException, Param } from '@nestjs/common'

import { ContractPresenter } from '../../presenters/contract-presenter'
import { GetContractByIdUseCaseAdapter } from './adapters/get-contract-by-id-adapter'

@Controller('/contracts/:id')
export class GetContractByIdController {
  constructor(private getContractById: GetContractByIdUseCaseAdapter) {}

  @Get()
  async handle(@Param('id') contractId: string) {
    const result = await this.getContractById.execute({ contractId })

    if (result.hasFailed()) {
      throw new NotFoundException(result.reason)
    }

    const { contract } = result.result

    return {
      contract: ContractPresenter.toHTTP(contract),
    }
  }
}
