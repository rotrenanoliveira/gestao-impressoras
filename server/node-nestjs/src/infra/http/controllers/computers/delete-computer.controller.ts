import { BadRequestException, Controller, Delete, HttpCode, Param } from '@nestjs/common'

import { DeleteComputerUseCaseAdapter } from './adapters/delete-computer-adapter'

@Controller('/computers/:id')
export class DeleteComputerController {
  constructor(private deleteComputer: DeleteComputerUseCaseAdapter) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') computerId: string) {
    const result = await this.deleteComputer.execute({
      computerId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
