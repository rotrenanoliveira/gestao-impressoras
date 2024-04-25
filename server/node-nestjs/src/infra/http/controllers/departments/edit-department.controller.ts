import { BadRequestException, Body, Controller, HttpCode, Param, Put } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { EditDepartmentUseCaseAdapter } from './adapters/edit-department-adapter'

const editDepartmentBodySchema = z.object({
  description: z.string(),
  email: z.string().email().nullable(),
})

type EditDepartmentBodySchema = z.infer<typeof editDepartmentBodySchema>

@Controller('/departments/:id')
export class EditDepartmentController {
  constructor(private editDepartment: EditDepartmentUseCaseAdapter) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(new ZodValidationPipe(editDepartmentBodySchema)) body: EditDepartmentBodySchema,
    @Param('id') departmentId: string,
  ) {
    const { description, email } = body

    const result = await this.editDepartment.execute({
      departmentId,
      description,
      email,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
