import { makeMobileDevice } from 'test/factories/make-mobile-device'
import { InMemoryMobileDevicesRepository } from 'test/repositories/in-memory-mobile-devices-repository'

import { GetMobileDeviceByIdUseCase } from './get-mobile-device-by-id'

let mobileDevicesRepository: InMemoryMobileDevicesRepository
let sut: GetMobileDeviceByIdUseCase

describe('Get mobile device by id', () => {
  beforeEach(() => {
    mobileDevicesRepository = new InMemoryMobileDevicesRepository()
    sut = new GetMobileDeviceByIdUseCase(mobileDevicesRepository)
  })

  it('should be able to get a mobile device by id', async () => {
    const newMobileDevice = makeMobileDevice({
      name: "Department's iPhone",
    })
    mobileDevicesRepository.items.push(newMobileDevice)

    const result = await sut.execute({
      mobileDeviceId: newMobileDevice.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.mobileDevice).toEqual(
        expect.objectContaining({
          id: newMobileDevice.id,
          name: "Department's iPhone",
        }),
      )
    }
  })

  it('should not be able to get mobile device with wrong id', async () => {
    const result = await sut.execute({
      mobileDeviceId: 'non-existent-mobile-device',
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
