import { BadRequestException, Controller, Delete, HttpCode, Param } from '@nestjs/common'

import { DeleteDeviceUseCaseAdapter } from './adapter/delete-device-adapter'

@Controller('/devices/:id')
export class DeleteDeviceController {
  constructor(private deleteDevice: DeleteDeviceUseCaseAdapter) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') deviceId: string) {
    const result = await this.deleteDevice.execute({
      deviceId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
