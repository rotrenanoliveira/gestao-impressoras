import { makeDevice } from 'test/factories/make-device'
import { InMemoryDevicesRepository } from 'test/repositories/in-memory-devices-repository'

import { DeleteDeviceUseCase } from './delete-device'

let devicesRepository: InMemoryDevicesRepository
let sut: DeleteDeviceUseCase

describe('Delete device', () => {
  beforeEach(() => {
    devicesRepository = new InMemoryDevicesRepository()
    sut = new DeleteDeviceUseCase(devicesRepository)
  })

  it('should be able to delete device', async () => {
    const newDevice = makeDevice()
    devicesRepository.items.push(newDevice)

    const result = await sut.execute({
      deviceId: newDevice.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()
    expect(devicesRepository.items).toHaveLength(0)
  })

  it('should not be able to delete device with invalid id', async () => {
    const result = await sut.execute({
      deviceId: 'non-existent-device',
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
