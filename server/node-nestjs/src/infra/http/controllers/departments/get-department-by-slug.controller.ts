import { BadRequestException, Controller, Get, NotFoundException, Param } from '@nestjs/common'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found'

import { DepartmentPresenter } from '../../presenters/department-presenter'
import { GetDepartmentBySlugUseCaseAdapter } from './adapters/get-department-by-slug-adapter'

@Controller('departments/:slug')
export class GetDepartmentBySlugController {
  constructor(private getDepartmentBySlug: GetDepartmentBySlugUseCaseAdapter) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getDepartmentBySlug.execute({
      slug,
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

    const department = result.result.department

    return {
      department: DepartmentPresenter.toHTTP(department),
    }
  }
}
