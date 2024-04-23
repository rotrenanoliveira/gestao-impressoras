import { BadRequestException, Body, Controller, HttpCode, Param, Put } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { EditComputerUseCaseAdapter } from './adapters/edit-computer-adapter'

const editComputerBodySchema = z.object({
  hostname: z.string(),
  ipAddress: z.union([z.string(), z.literal('DYNAMIC')]),
  operatingSystem: z.string(),
  model: z.string(),
  description: z.string(),
  warrantyEndDate: z.coerce.date().nullable(),
  contractId: z.string().nullable(),
})

type EditComputerBodySchema = z.infer<typeof editComputerBodySchema>

@Controller('/computers/:id')
export class EditComputerController {
  constructor(private editComputer: EditComputerUseCaseAdapter) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('id') computerId: string,
    @Body(new ZodValidationPipe(editComputerBodySchema)) body: EditComputerBodySchema,
  ) {
    const { hostname, ipAddress, operatingSystem, model, description, warrantyEndDate, contractId } = body

    const result = await this.editComputer.execute({
      computerId,
      contractId,
      hostname,
      ipAddress,
      operatingSystem,
      model,
      description,
      warrantyEndDate,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
