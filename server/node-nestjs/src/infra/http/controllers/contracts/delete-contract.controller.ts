import { BadRequestException, Controller, Delete, HttpCode, Param } from '@nestjs/common'

import { DeleteContractUseCaseAdapter } from './adapters/delete-contract-adapter'

@Controller('/contracts/:id')
export class DeleteContractController {
  constructor(private deleteContract: DeleteContractUseCaseAdapter) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') contractId: string) {
    const result = await this.deleteContract.execute({
      contractId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
