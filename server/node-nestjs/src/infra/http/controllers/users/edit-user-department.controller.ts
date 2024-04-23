import { BadRequestException, Body, Controller, HttpCode, Param, Patch } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { EditUserDepartmentUseCaseAdapter } from './adapters/edit-user-department-adapter'

const editUserDepartmentBodySchema = z.object({
  departmentId: z.string().uuid(),
})

type EditUserDepartmentBodySchema = z.infer<typeof editUserDepartmentBodySchema>

@Controller('/users/:id/edit-department')
export class EditUserDepartmentController {
  constructor(private editUserDepartment: EditUserDepartmentUseCaseAdapter) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Param('id') userId: string,
    @Body(new ZodValidationPipe(editUserDepartmentBodySchema)) body: EditUserDepartmentBodySchema,
  ) {
    const { departmentId } = body

    const result = await this.editUserDepartment.execute({
      userId,
      departmentId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException()
    }
  }
}
