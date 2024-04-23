import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { ContractPresenter } from '../../presenters/contract-presenter'
import { CreateContractUseCaseAdapter } from './adapters/create-contract-adapter'

const createContractBodySchema = z.object({
  description: z.string(),
  type: z.union([z.literal('rental'), z.literal('loan')]),
  contactEmail: z.string().email(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date().optional(),
})

type CreateContractBodySchema = z.infer<typeof createContractBodySchema>

@Controller('/contracts')
export class CreateContractController {
  constructor(private createContract: CreateContractUseCaseAdapter) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(new ZodValidationPipe(createContractBodySchema)) body: CreateContractBodySchema) {
    const { description, type, contactEmail, startAt, endAt } = body

    const result = await this.createContract.execute({
      description,
      type,
      contactEmail,
      startAt,
      endAt,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }

    const { contract } = result.result

    return {
      contract: ContractPresenter.toHTTP(contract),
    }
  }
}
