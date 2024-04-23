import { BadRequestException, Controller, Get } from '@nestjs/common'

import { MobileDevicePresenter } from '../../presenters/mobile-device-presenter'
import { FetchDeleteMobilesDeviceUseCaseAdapter } from './adapters/fetch-mobile-devices-adapters'

@Controller('/mobile-devices')
export class FetchMobileDevicesController {
  constructor(private fetchMobileDevices: FetchDeleteMobilesDeviceUseCaseAdapter) {}

  @Get()
  async handle() {
    const result = await this.fetchMobileDevices.execute()

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }

    const { mobileDevices } = result.result

    return {
      mobileDevices: mobileDevices.map(MobileDevicePresenter.toHTTP),
    }
  }
}
