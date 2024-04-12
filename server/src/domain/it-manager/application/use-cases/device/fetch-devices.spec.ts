import { InMemoryDevicesRepository } from 'test/repositories/in-memory-devices-repository'
import { FetchDevicesUseCase } from './fetch-devices'
import { makeDevice } from 'test/factories/make-device'

let devicesRepository: InMemoryDevicesRepository
let sut: FetchDevicesUseCase

describe('Fetch devices', () => {
  beforeEach(() => {
    devicesRepository = new InMemoryDevicesRepository()
    sut = new FetchDevicesUseCase(devicesRepository)
  })

  it('should be able to fetch devices', async () => {
    for (let i = 0; i < 5; i++) {
      devicesRepository.items.push(
        makeDevice({
          model: `Device model ${i + 1}`,
        }),
      )
    }

    const result = await sut.execute()

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.devices).toHaveLength(5)
      expect(devicesRepository.items).toHaveLength(5)
    }
  })
})
