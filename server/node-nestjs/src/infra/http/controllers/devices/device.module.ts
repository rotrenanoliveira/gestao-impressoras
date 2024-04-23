import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'

import { CreateDeviceUseCaseAdapter } from './adapter/create-device-adapter'
import { DeleteDeviceUseCaseAdapter } from './adapter/delete-device-adapter'
import { EditDeviceUseCaseAdapter } from './adapter/edit-device-adapter'
import { FetchDevicesUseCaseAdapter } from './adapter/fetch-devices-adapter'
import { GetDeviceByIdUseCaseAdapter } from './adapter/get-device-by-id-adapter'
import { CreateDeviceController } from './create-device.controller'
import { DeleteDeviceController } from './delete-device.controller'
import { EditDeviceController } from './edit-device.controller'
import { FetchDevicesController } from './fetch-devices.controller'
import { GetDeviceByIdController } from './get-device-by-id.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateDeviceController,
    DeleteDeviceController,
    EditDeviceController,
    FetchDevicesController,
    GetDeviceByIdController,
  ],
  providers: [
    CreateDeviceUseCaseAdapter,
    DeleteDeviceUseCaseAdapter,
    EditDeviceUseCaseAdapter,
    FetchDevicesUseCaseAdapter,
    GetDeviceByIdUseCaseAdapter,
  ],
})
export class DeviceModule {}
