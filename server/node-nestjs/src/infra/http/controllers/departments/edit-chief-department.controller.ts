import { BadRequestException, Body, Controller, HttpCode, Param, Patch } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { EditChiefDepartmentUseCaseAdapter } from './adapters/edit-chief-department-adapter'

const editChiefDepartmentBodySchema = z.object({
  chiefId: z.string().uuid(),
})

type EditChiefDepartmentBodySchema = z.infer<typeof editChiefDepartmentBodySchema>

@Controller('/departments/:id/edit-chief')
export class EditChiefDepartmentController {
  constructor(private editChiefDepartment: EditChiefDepartmentUseCaseAdapter) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Param('id') departmentId: string,
    @Body(new ZodValidationPipe(editChiefDepartmentBodySchema)) body: EditChiefDepartmentBodySchema,
  ) {
    const { chiefId } = body

    const result = await this.editChiefDepartment.execute({
      departmentId,
      chiefId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
