import { BadRequestException, Controller, Delete, HttpCode, Param } from '@nestjs/common'

import { DeleteMobileDeviceUseCaseAdapter } from './adapters/delete-mobile-device-adapter'

@Controller('/mobile-devices/:id')
export class DeleteMobileDeviceController {
  constructor(private deleteMobileDevice: DeleteMobileDeviceUseCaseAdapter) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') mobileDeviceId: string) {
    const result = await this.deleteMobileDevice.execute({
      mobileDeviceId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
