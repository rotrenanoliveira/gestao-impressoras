import { BadRequestException, Controller, Delete, HttpCode, Param } from '@nestjs/common'

import { DeleteWorkstationUseCaseAdapter } from './adapters/delete-workstation-adapter'

@Controller('/workstations/:id')
export class DeleteWorkstationController {
  constructor(private deleteWorkstation: DeleteWorkstationUseCaseAdapter) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') workstationId: string) {
    const result = await this.deleteWorkstation.execute({
      workstationId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
