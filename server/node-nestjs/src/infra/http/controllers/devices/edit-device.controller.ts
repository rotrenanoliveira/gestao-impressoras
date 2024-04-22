import { BadRequestException, Body, Controller, HttpCode, Param, Put } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'
import { EditDeviceUseCaseAdapter } from './adapter/edit-device-adapter'

const editDeviceBodySchema = z.object({
  model: z.string(),
  contractId: z.string().uuid().nullable(),
  warrantyEndDate: z.coerce.date().nullable(),
})

type EditDeviceBodySchema = z.infer<typeof editDeviceBodySchema>

@Controller('/devices/:id')
export class EditDeviceController {
  constructor(private editDevice: EditDeviceUseCaseAdapter) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('id') deviceId: string,
    @Body(new ZodValidationPipe(editDeviceBodySchema)) body: EditDeviceBodySchema,
  ) {
    const { model, contractId, warrantyEndDate } = body

    const result = await this.editDevice.execute({
      deviceId,
      model,
      contractId,
      warrantyEndDate,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
