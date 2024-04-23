import { BadRequestException, Controller, Get } from '@nestjs/common'

import { UserPresenter } from '../../presenters/user-presenter'
import { FetchUsersUseCaseAdapter } from './adapters/fetch-users-adapter'

@Controller('/users')
export class FetchUsersController {
  constructor(private fetchUsers: FetchUsersUseCaseAdapter) {}

  @Get()
  async handle() {
    const result = await this.fetchUsers.execute()

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }

    const users = result.result.users

    return {
      users: users.map(UserPresenter.toHTTP),
    }
  }
}
