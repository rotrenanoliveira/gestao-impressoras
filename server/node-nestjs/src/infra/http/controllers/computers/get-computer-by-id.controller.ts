import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import { ComputerPresenter } from '../../presenters/computer-presenter'
import { GetComputerByIdUseCaseAdapter } from './adapters/get-computer-by-id-adapter'

@Controller('/computers/:id')
export class GetComputerByIdController {
  constructor(private getComputerById: GetComputerByIdUseCaseAdapter) {}

  @Get()
  async handle(@Param('id') computerId: string) {
    const result = await this.getComputerById.execute({
      computerId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }

    const { computer } = result.result

    return {
      computer: ComputerPresenter.toHTTP(computer),
    }
  }
}
