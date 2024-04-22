import { BadRequestException, Controller, Get } from '@nestjs/common'

import { DevicePresenter } from '../../presenters/device-presenter'
import { FetchDevicesUseCaseAdapter } from './adapter/fetch-devices-adapter'

@Controller('/devices')
export class FetchDevicesController {
  constructor(private fetchDevices: FetchDevicesUseCaseAdapter) {}

  @Get()
  async handle() {
    const result = await this.fetchDevices.execute()

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }

    const { devices } = result.result

    return {
      devices: devices.map(DevicePresenter.toHTTP),
    }
  }
}
