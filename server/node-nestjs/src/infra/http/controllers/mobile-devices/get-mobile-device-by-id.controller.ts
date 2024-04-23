import { BadRequestException, Controller, Get, NotFoundException, Param } from '@nestjs/common'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found'

import { MobileDevicePresenter } from '../../presenters/mobile-device-presenter'
import { GetMobileDeviceByIdUseCaseAdapter } from './adapters/get-mobile-device-by-id-adapter'

@Controller('/mobile-devices/:id')
export class GetMobileDeviceByIdController {
  constructor(private getMobileDeviceById: GetMobileDeviceByIdUseCaseAdapter) {}

  @Get()
  async handle(@Param('id') mobileDeviceId: string) {
    const result = await this.getMobileDeviceById.execute({
      mobileDeviceId,
    })

    if (result.hasFailed()) {
      const error = result.reason

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error)
        default:
          throw new BadRequestException(error)
      }
    }

    const { mobileDevice } = result.result

    return {
      mobileDevice: MobileDevicePresenter.toHTTP(mobileDevice),
    }
  }
}
