import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'

import { DepartmentWithChiefPresenter } from '../../presenters/department-with-chief-presenter'
import { FetchDepartmentsUseCaseAdapter } from './adapters/fetch-departments-adapter'

@Controller('/departments')
export class FetchDepartmentsController {
  constructor(private fetchDepartments: FetchDepartmentsUseCaseAdapter) {}

  @Get()
  @HttpCode(200)
  async handle() {
    const result = await this.fetchDepartments.execute('departments-with-chief')

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
    const departments = result.result.departments

    return {
      departments: departments.map(DepartmentWithChiefPresenter.toHTTP),
    }
  }
}
