import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { WorkstationPresenter } from '../../presenters/workstation-presenter'
import { CreateWorkstationUseCaseAdapter } from './adapters/create-workstation-adapter'

const createWorkstationBodySchema = z.object({
  tag: z.string(),
  departmentId: z.string().uuid(),
  computerId: z.string().uuid(),
})

type CreateWorkstationBodySchema = z.infer<typeof createWorkstationBodySchema>

@Controller('/workstations')
export class CreateWorkstationController {
  constructor(private createWorkstation: CreateWorkstationUseCaseAdapter) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(new ZodValidationPipe(createWorkstationBodySchema)) body: CreateWorkstationBodySchema) {
    const { tag, departmentId, computerId } = body

    const result = await this.createWorkstation.execute({
      tag,
      departmentId,
      computerId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }

    const { workstation } = result.result

    return {
      workstation: WorkstationPresenter.toHTTP(workstation),
    }
  }
}
