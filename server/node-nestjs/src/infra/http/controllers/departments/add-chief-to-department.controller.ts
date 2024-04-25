import { BadRequestException, Body, Controller, HttpCode, Param, Patch } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { AddChiefToDepartmentUseCaseAdapter } from './adapters/add-chief-to-department-adapter'

const addChiefDepartmentBodySchema = z.object({
  chiefId: z.string().uuid(),
})

type AddChiefDepartmentBodySchema = z.infer<typeof addChiefDepartmentBodySchema>

@Controller('/departments/:id/add-chief')
export class AddChiefToDepartmentController {
  constructor(private addChiefToDepartment: AddChiefToDepartmentUseCaseAdapter) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Param('id') departmentId: string,
    @Body(new ZodValidationPipe(addChiefDepartmentBodySchema)) body: AddChiefDepartmentBodySchema,
  ) {
    const { chiefId } = body

    const result = await this.addChiefToDepartment.execute({
      departmentId,
      chiefId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
