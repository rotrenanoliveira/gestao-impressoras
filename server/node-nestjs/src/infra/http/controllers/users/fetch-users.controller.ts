import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { UserPresenter } from '../../presenters/user-presenter'
import { FetchUsersUseCaseAdapter } from './adapters/fetch-users-adapter'

const fetchUsersQuerySchema = z.object({
  email: z.string().email().optional(),
  department: z.string().optional(),
})

type FetchUsersQuerySchema = z.infer<typeof fetchUsersQuerySchema>

@Controller('/users')
export class FetchUsersController {
  constructor(private fetchUsers: FetchUsersUseCaseAdapter) {}

  @Get()
  async handle(@Query(new ZodValidationPipe(fetchUsersQuerySchema)) query: FetchUsersQuerySchema) {
    const result = await this.fetchUsers.execute({
      ...query,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }

    const users = result.result.users

    return {
      users: users.map(UserPresenter.toHTTP),
    }
  }
}
