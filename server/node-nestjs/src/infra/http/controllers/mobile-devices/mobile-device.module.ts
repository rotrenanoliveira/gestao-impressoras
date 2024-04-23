import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'

import { CreateMobileDeviceUseCaseAdapter } from './adapters/create-mobile-device-adapter'
import { DeleteMobileDeviceUseCaseAdapter } from './adapters/delete-mobile-device-adapter'
import { EditMobileDeviceUseCaseAdapter } from './adapters/edit-mobile-device-adapter'
import { FetchDeleteMobilesDeviceUseCaseAdapter } from './adapters/fetch-mobile-devices-adapters'
import { GetMobileDeviceByIdUseCaseAdapter } from './adapters/get-mobile-device-by-id-adapter'
import { CreateMobileDeviceController } from './create-mobile-device.controller'
import { DeleteMobileDeviceController } from './delete-mobile-device.controller'
import { EditMobileDeviceController } from './edit-mobile-device.controller'
import { FetchMobileDevicesController } from './fetch-mobile-devices.controller'
import { GetMobileDeviceByIdController } from './get-mobile-device-by-id.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateMobileDeviceController,
    DeleteMobileDeviceController,
    EditMobileDeviceController,
    FetchMobileDevicesController,
    GetMobileDeviceByIdController,
  ],
  providers: [
    CreateMobileDeviceUseCaseAdapter,
    DeleteMobileDeviceUseCaseAdapter,
    EditMobileDeviceUseCaseAdapter,
    FetchDeleteMobilesDeviceUseCaseAdapter,
    GetMobileDeviceByIdUseCaseAdapter,
  ],
})
export class MobileDeviceModule {}
