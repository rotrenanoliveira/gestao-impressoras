import { BadRequestException, Controller, Get } from '@nestjs/common'

import { ComputerPresenter } from '../../presenters/computer-presenter'
import { FetchComputersUseCaseAdapter } from './adapters/fetch-computers-adapter'

@Controller('/computers')
export class FetchComputersController {
  constructor(private fetchComputers: FetchComputersUseCaseAdapter) {}

  @Get()
  async handle() {
    const result = await this.fetchComputers.execute()

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }

    const { computers } = result.result

    return {
      computers: computers.map(ComputerPresenter.toHTTP),
    }
  }
}
