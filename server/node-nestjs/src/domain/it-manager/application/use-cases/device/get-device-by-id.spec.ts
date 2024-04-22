import { makeDevice } from 'test/factories/make-device'
import { InMemoryDevicesRepository } from 'test/repositories/in-memory-devices-repository'

import { GetDeviceByIdUseCase } from './get-device-by-id'

let devicesRepository: InMemoryDevicesRepository
let sut: GetDeviceByIdUseCase

describe('Get device by id', () => {
  beforeEach(() => {
    devicesRepository = new InMemoryDevicesRepository()
    sut = new GetDeviceByIdUseCase(devicesRepository)
  })

  it('should be able to get device by id', async () => {
    const newDevice = makeDevice({
      model: 'Device model 01',
      serialNumber: 'DEV00123',
    })
    devicesRepository.items.push(newDevice)

    const result = await sut.execute({
      deviceId: newDevice.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.device).toEqual(
        expect.objectContaining({
          id: newDevice.id,
          model: 'Device model 01',
          serialNumber: 'DEV00123',
        }),
      )
    }
  })

  it('should not be able to get device with invalid id', async () => {
    const result = await sut.execute({
      deviceId: 'non-existent-device',
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
