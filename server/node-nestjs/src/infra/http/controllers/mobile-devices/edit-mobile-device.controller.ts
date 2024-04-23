import { BadRequestException, Body, Controller, HttpCode, Param, Put } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { EditMobileDeviceUseCaseAdapter } from './adapters/edit-mobile-device-adapter'

const editMobileDeviceBodySchema = z.object({
  name: z.string(),
  model: z.string(),
  operatingSystem: z.string(),
  contractId: z.string().nullable(),
  departmentId: z.string().nullable(),
  serviceNumber: z.string().nullable(),
  serviceCompany: z.string().nullable(),
  warrantyEndDate: z.coerce.date().nullable(),
})

type EditMobileDeviceBodySchema = z.infer<typeof editMobileDeviceBodySchema>

@Controller('/mobile-devices/:id')
export class EditMobileDeviceController {
  constructor(private editMobileDevice: EditMobileDeviceUseCaseAdapter) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('id') mobileDeviceId: string,
    @Body(new ZodValidationPipe(editMobileDeviceBodySchema)) body: EditMobileDeviceBodySchema,
  ) {
    const { name, model, operatingSystem, contractId, departmentId, serviceNumber, serviceCompany, warrantyEndDate } =
      body

    const result = await this.editMobileDevice.execute({
      mobileDeviceId,
      name,
      model,
      contractId,
      departmentId,
      serviceNumber,
      serviceCompany,
      warrantyEndDate,
      operatingSystem,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
