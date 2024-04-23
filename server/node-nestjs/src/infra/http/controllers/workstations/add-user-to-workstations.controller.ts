import { BadRequestException, Body, Controller, HttpCode, Param, Patch } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { AddUserToWorkstationUseCaseAdapter } from './adapters/add-user-to-workstation-adapter'

const addUserToWorkstationBodySchema = z.object({
  userId: z.string().uuid(),
})

type AddUserToWorkstationBodySchema = z.infer<typeof addUserToWorkstationBodySchema>

@Controller('/workstations/:id/add-user')
export class AddUserToWorkstationController {
  constructor(private addUserToWorkstation: AddUserToWorkstationUseCaseAdapter) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Param('id') workstationId: string,
    @Body(new ZodValidationPipe(addUserToWorkstationBodySchema)) body: AddUserToWorkstationBodySchema,
  ) {
    const { userId } = body

    const result = await this.addUserToWorkstation.execute({
      workstationId,
      userId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
