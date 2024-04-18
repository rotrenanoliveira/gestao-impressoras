import { BadRequestException, Controller, HttpCode, Param, Patch } from '@nestjs/common'

import { ActiveUserUseCaseAdapter } from './adapters/active-user-adapter'

@Controller('/users/:id/active')
export class ActiveUserController {
  constructor(private activeUser: ActiveUserUseCaseAdapter) {}

  @Patch()
  @HttpCode(204)
  async handle(@Param('id') userId: string) {
    const result = await this.activeUser.execute({
      userId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
