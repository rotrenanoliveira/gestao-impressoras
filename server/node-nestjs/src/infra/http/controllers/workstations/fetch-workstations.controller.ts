import { BadRequestException, Controller, Get } from '@nestjs/common'

import { WorkstationPresenter } from '../../presenters/workstation-presenter'
import { FetchWorkstationsUseCaseAdapter } from './adapters/fetch-workstations-adapter'

@Controller('/workstations')
export class FetchWorkstationsController {
  constructor(private fetchWorkstations: FetchWorkstationsUseCaseAdapter) {}

  @Get()
  async handle() {
    const result = await this.fetchWorkstations.execute()

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }

    const { workstations } = result.result

    return {
      workstations: workstations.map(WorkstationPresenter.toHTTP),
    }
  }
}
