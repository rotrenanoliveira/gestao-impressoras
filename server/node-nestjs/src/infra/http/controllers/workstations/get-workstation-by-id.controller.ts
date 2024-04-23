import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import { WorkstationPresenter } from '../../presenters/workstation-presenter'
import { GetWorkstationByIdUseCaseAdapter } from './adapters/get-workstation-by-id-adapter'

@Controller('/workstations/:id')
export class GetWorkstationByIdController {
  constructor(private getWorkstationById: GetWorkstationByIdUseCaseAdapter) {}

  @Get()
  async handle(@Param('id') workstationId: string) {
    const result = await this.getWorkstationById.execute({
      workstationId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }

    const { workstation } = result.result

    return {
      workstation: WorkstationPresenter.toHTTP(workstation),
    }
  }
}
