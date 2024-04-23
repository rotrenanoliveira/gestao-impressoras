import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { UserLicensePresenter } from '../../presenters/user-license-presenter'
import { CreateUserLicenseUseCaseAdapter } from './adapters/create-user-license-adapter'

const createUserLicenseBodySchema = z.object({
  licenseId: z.string().uuid(),
  userId: z.string().uuid().nullable().optional(),
  departmentId: z.string().uuid().nullable().optional(),
})

type CreateUserLicenseBodySchema = z.infer<typeof createUserLicenseBodySchema>

@Controller('/user-licenses')
export class CreateUserLicenseController {
  constructor(private createUserLicense: CreateUserLicenseUseCaseAdapter) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(new ZodValidationPipe(createUserLicenseBodySchema)) body: CreateUserLicenseBodySchema) {
    const userId = body.userId ?? null
    const departmentId = body.departmentId ?? null

    const result = await this.createUserLicense.execute({
      licenseId: body.licenseId,
      userId,
      departmentId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }

    const userLicense = result.result.userLicense

    return {
      userLicense: UserLicensePresenter.toHTTP(userLicense),
    }
  }
}
