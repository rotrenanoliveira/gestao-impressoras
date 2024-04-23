import { BadRequestException, Body, Controller, HttpCode, Param, Put } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { EditUserUseCaseAdapter } from './adapters/edit-user-adapter'

const editUserBodySchema = z.object({
  departmentId: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().nullable(),
  badge: z.string(),
})

type EditUserBodySchema = z.infer<typeof editUserBodySchema>

@Controller('/users/:id')
export class EditUserController {
  constructor(private editUser: EditUserUseCaseAdapter) {}

  @Put()
  @HttpCode(204)
  async handle(@Body(new ZodValidationPipe(editUserBodySchema)) body: EditUserBodySchema, @Param('id') userId: string) {
    const { departmentId, name, email, phone, badge } = body

    const result = await this.editUser.execute({
      userId,
      departmentId,
      name,
      email,
      phone,
      badge,
    })

    if (result.hasFailed()) {
      throw new BadRequestException()
    }
  }
}
