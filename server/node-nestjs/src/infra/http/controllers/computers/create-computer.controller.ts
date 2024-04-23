import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { ComputerPresenter } from '../../presenters/computer-presenter'
import { CreateComputerUseCaseAdapter } from './adapters/create-computer-adapter'

const createComputerBodySchema = z.object({
  hostname: z.string(),
  ipAddress: z.union([z.string(), z.literal('DYNAMIC')]),
  operatingSystem: z.string(),
  type: z.union([z.literal('NOTEBOOK'), z.literal('DESKTOP'), z.literal('SERVER')]),
  model: z.string(),
  serialNumber: z.string(),
  invoice: z.string(),
  description: z.string(),
  assetTag: z.string().nullable(),
  warrantyEndDate: z.coerce.date().nullable(),
  purchaseDate: z.coerce.date(),
  contractId: z.string().nullable(),
})

type CreateComputerBodySchema = z.infer<typeof createComputerBodySchema>

@Controller('/computers')
export class CreateComputerController {
  constructor(private createComputer: CreateComputerUseCaseAdapter) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(new ZodValidationPipe(createComputerBodySchema)) body: CreateComputerBodySchema) {
    const result = await this.createComputer.execute({
      hostname: body.hostname,
      ipAddress: body.ipAddress,
      operatingSystem: body.operatingSystem,
      type: body.type,
      model: body.model,
      serialNumber: body.serialNumber,
      description: body.description,
      assetTag: body.assetTag,
      invoice: body.invoice,
      purchaseDate: body.purchaseDate,
      warrantyEndDate: body.warrantyEndDate,
      contractId: body.contractId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }

    const { computer } = result.result

    return {
      computer: ComputerPresenter.toHTTP(computer),
    }
  }
}
