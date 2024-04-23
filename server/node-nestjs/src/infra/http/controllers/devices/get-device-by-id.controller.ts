import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import { DevicePresenter } from '../../presenters/device-presenter'
import { GetDeviceByIdUseCaseAdapter } from './adapter/get-device-by-id-adapter'

@Controller('/devices/:id')
export class GetDeviceByIdController {
  constructor(private getDeviceById: GetDeviceByIdUseCaseAdapter) {}

  @Get()
  async handle(@Param('id') deviceId: string) {
    const result = await this.getDeviceById.execute({
      deviceId,
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
