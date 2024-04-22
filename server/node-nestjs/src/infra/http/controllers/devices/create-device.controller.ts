import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { DevicePresenter } from '../../presenters/device-presenter'
import { CreateDeviceUseCaseAdapter } from './adapter/create-device-adapter'

const createDeviceBodySchema = z.object({
  serialNumber: z.string(),
  model: z.string(),
  invoice: z.string(),
  purchaseDate: z.coerce.date(),
  contractId: z.string().uuid().nullable(),
  assetTag: z.string().nullable(),
  warrantyEndDate: z.coerce.date().nullable(),
})

type CreateDeviceBodySchema = z.infer<typeof createDeviceBodySchema>

@Controller('/devices')
export class CreateDeviceController {
  constructor(private createDevice: CreateDeviceUseCaseAdapter) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(new ZodValidationPipe(createDeviceBodySchema)) body: CreateDeviceBodySchema) {
    const { serialNumber, model, invoice, purchaseDate, contractId, assetTag, warrantyEndDate } = body

    const result = await this.createDevice.execute({
      serialNumber,
      model,
      invoice,
      purchaseDate,
      contractId,
      assetTag,
      warrantyEndDate,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }

    const { device } = result.result

    return {
      device: DevicePresenter.toHTTP(device),
    }
  }
}
