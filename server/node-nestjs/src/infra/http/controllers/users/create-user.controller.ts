import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { UserPresenter } from '../../presenters/user-presenter'
import { CreateUserUseCaseAdapter } from './adapters/create-user-adapter'

const createUserBodySchema = z.object({
  departmentId: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
  badge: z.string(),
  phone: z.string().nullable(),
  workstationId: z.string().nullable(),
})

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>

@Controller('/users')
export class CreateUserController {
  constructor(private createUser: CreateUserUseCaseAdapter) {}

  @HttpCode(201)
  @Post()
  async handle(@Body(new ZodValidationPipe(createUserBodySchema)) body: CreateUserBodySchema) {
    const { name, email, badge, phone, departmentId, workstationId } = body

    const result = await this.createUser.execute({
      name,
      email,
      badge,
      phone,
      departmentId,
      workstationId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException()
    }

    const user = result.result.user

    return {
      user: UserPresenter.toHTTP(user),
    }
  }
}
