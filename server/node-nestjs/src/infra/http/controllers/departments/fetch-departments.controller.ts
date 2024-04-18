import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'

import { DepartmentPresenter } from '../../presenters/department-presenter'
import { FetchDepartmentsUseCaseAdapter } from './adapters/fetch-departments-adapter'

@Controller('/departments')
export class FetchDepartmentsController {
  constructor(private fetchDepartments: FetchDepartmentsUseCaseAdapter) {}

  @Get()
  @HttpCode(200)
  async handle() {
    const result = await this.fetchDepartments.execute()

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
    const response = result.result.departments
    const departments = response.map(DepartmentPresenter.toHttpResponse)

    return {
      departments,
    }
  }
}
