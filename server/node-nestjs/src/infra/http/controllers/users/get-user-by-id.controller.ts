import { BadRequestException, Controller, Get, NotFoundException, Param } from '@nestjs/common'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found'

import { UserPresenter } from '../../presenters/user-presenter'
import { GetUserByIdUseCaseAdapter } from './adapters/get-user-by-id-adapter'

@Controller('/users/:id')
export class GetUserByIdController {
  constructor(private getUser: GetUserByIdUseCaseAdapter) {}

  @Get()
  async handle(@Param('id') userId: string) {
    const result = await this.getUser.execute({
      userId,
    })

    if (result.hasFailed()) {
      const error = result.reason

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException()
        default:
          throw new BadRequestException()
      }
    }

    const user = result.result.user

    return {
      user: UserPresenter.toHTTP(user),
    }
  }
}
