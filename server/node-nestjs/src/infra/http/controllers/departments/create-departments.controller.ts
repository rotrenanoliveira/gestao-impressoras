import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { DepartmentPresenter } from '../../presenters/department-presenter'
import { CreateDepartmentUseCaseAdapter } from './adapters/create-department-adapter'

const createDepartmentBodySchema = z.object({
  description: z.string(),
  email: z.string().email().nullable(),
})

type CreateDepartmentBodySchema = z.infer<typeof createDepartmentBodySchema>

@Controller('/departments')
export class CreatedDepartmentController {
  constructor(private createDepartment: CreateDepartmentUseCaseAdapter) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createDepartmentBodySchema))
  async handle(@Body() body: CreateDepartmentBodySchema) {
    const { description, email } = body

    const result = await this.createDepartment.execute({
      description,
      email,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }

    return {
      department: DepartmentPresenter.toHTTP(result.result.department),
    }
  }
}
