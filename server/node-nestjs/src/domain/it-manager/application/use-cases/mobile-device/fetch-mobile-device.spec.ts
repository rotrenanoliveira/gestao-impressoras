import { makeMobileDevice } from 'test/factories/make-mobile-device'
import { InMemoryMobileDevicesRepository } from 'test/repositories/in-memory-mobile-devices-repository'

import { FetchMobileDevicesUseCase } from './fetch-mobile-devices'

let mobileDevicesRepository: InMemoryMobileDevicesRepository
let sut: FetchMobileDevicesUseCase

describe('Fetch mobile device', () => {
  beforeEach(() => {
    mobileDevicesRepository = new InMemoryMobileDevicesRepository()
    sut = new FetchMobileDevicesUseCase(mobileDevicesRepository)
  })

  it('should be able to fetch mobile device', async () => {
    for (let i = 0; i < 5; i++) {
      mobileDevicesRepository.items.push(makeMobileDevice())
    }

    const result = await sut.execute()

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.mobileDevices).toHaveLength(5)
      expect(mobileDevicesRepository.items).toHaveLength(5)
    }
  })
})
