import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { WorkstationPresenter } from '../../presenters/workstation-presenter'
import { FetchWorkstationsUseCaseAdapter } from './adapters/fetch-workstations-adapter'

const fetchWorkstationsQuerySchema = z.object({
  department: z.string().optional(),
})

type FetchWorkstationsQuerySchema = z.infer<typeof fetchWorkstationsQuerySchema>

@Controller('/workstations')
export class FetchWorkstationsController {
  constructor(private fetchWorkstations: FetchWorkstationsUseCaseAdapter) {}

  @Get()
  async handle(@Query(new ZodValidationPipe(fetchWorkstationsQuerySchema)) query: FetchWorkstationsQuerySchema) {
    const result = await this.fetchWorkstations.execute({
      ...query,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }

    const { workstations } = result.result

    return {
      workstations: workstations.map(WorkstationPresenter.toHTTP),
    }
  }
}
