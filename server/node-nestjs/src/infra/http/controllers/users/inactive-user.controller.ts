import { BadRequestException, Controller, HttpCode, Param, Patch } from '@nestjs/common'

import { InactiveUserUseCaseAdapter } from './adapters/inactive-user-adapter'

@Controller('/users/:id/inactive')
export class InactiveUserController {
  constructor(private activeUser: InactiveUserUseCaseAdapter) {}

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
