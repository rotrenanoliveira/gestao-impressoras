import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { DepartmentPresenter } from '../../presenters/department-presenter'
import { CreateDepartmentUseCaseAdapter } from './adapters/create-department-adapter'

const createDepartmentBodySchema = z.object({
  description: z.string(),
  email: z.string().email().nullable(),
  chiefId: z.string().uuid().nullable(),
})

type CreateDepartmentBodySchema = z.infer<typeof createDepartmentBodySchema>

@Controller('/departments')
export class CreatedDepartmentController {
  constructor(private createDepartment: CreateDepartmentUseCaseAdapter) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createDepartmentBodySchema))
  async handle(@Body() body: CreateDepartmentBodySchema) {
    const { description, email, chiefId } = body

    const result = await this.createDepartment.execute({
      description,
      email,
      chiefId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }

    await new Promise((resolve) => setTimeout(resolve, 1500))

    return {
      department: DepartmentPresenter.toHttpResponse(result.result.department),
    }
  }
}
