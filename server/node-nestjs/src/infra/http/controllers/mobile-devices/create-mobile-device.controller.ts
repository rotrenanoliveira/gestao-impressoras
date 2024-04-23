import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { MobileDevicePresenter } from '../../presenters/mobile-device-presenter'
import { CreateMobileDeviceUseCaseAdapter } from './adapters/create-mobile-device-adapter'

const createMobileDeviceBodySchema = z.object({
  name: z.string(),
  model: z.string(),
  serialNumber: z.string(),
  type: z.string(),
  invoice: z.string(),
  assetTag: z.string().nullable(),
  operatingSystem: z.string(),
  purchaseDate: z.coerce.date(),
  serviceCompany: z.string().nullable(),
  serviceNumber: z.string().nullable(),
  warrantyEndDate: z.coerce.date().nullable(),
  departmentId: z.string().uuid().nullable(),
  contractId: z.string().uuid().nullable(),
})

type CreateMobileDeviceBodySchema = z.infer<typeof createMobileDeviceBodySchema>

@Controller('/mobile-devices')
export class CreateMobileDeviceController {
  constructor(private createMobileDevice: CreateMobileDeviceUseCaseAdapter) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(new ZodValidationPipe(createMobileDeviceBodySchema)) body: CreateMobileDeviceBodySchema) {
    const result = await this.createMobileDevice.execute({
      name: body.name,
      model: body.model,
      serialNumber: body.serialNumber,
      type: body.type,
      invoice: body.invoice,
      assetTag: body.assetTag,
      operatingSystem: body.operatingSystem,
      purchaseDate: body.purchaseDate,
      serviceCompany: body.serviceCompany,
      serviceNumber: body.serviceNumber,
      warrantyEndDate: body.warrantyEndDate,
      departmentId: body.departmentId,
      contractId: body.contractId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }

    const { mobileDevice } = result.result

    return {
      mobileDevice: MobileDevicePresenter.toHTTP(mobileDevice),
    }
  }
}
