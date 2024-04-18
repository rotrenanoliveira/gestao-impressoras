import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import { UserPresenter } from '../../presenters/user-presenter'
import { FetchUsersByDepartmentUseCaseAdapter } from './adapters/fetch-users-by-department-adapter'

@Controller('/users/department/:id')
export class FetchUsersByDepartmentController {
  constructor(private fetchUsersByDepartment: FetchUsersByDepartmentUseCaseAdapter) {}

  @Get()
  async handle(@Param('id') departmentId: string) {
    const result = await this.fetchUsersByDepartment.execute({
      departmentId,
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
