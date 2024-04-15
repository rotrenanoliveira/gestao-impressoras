import { makeMobileDevice } from 'test/factories/make-mobile-device'
import { InMemoryMobileDevicesRepository } from 'test/repositories/in-memory-mobile-devices-repository'
import { DeleteMobileDeviceUseCase } from './delete-mobile-device'

let mobileDevicesRepository: InMemoryMobileDevicesRepository
let sut: DeleteMobileDeviceUseCase

describe('Delete mobile device', () => {
  beforeEach(() => {
    mobileDevicesRepository = new InMemoryMobileDevicesRepository()
    sut = new DeleteMobileDeviceUseCase(mobileDevicesRepository)
  })

  it('should be able to delete mobile device', async () => {
    const newMobileDevice = makeMobileDevice()
    mobileDevicesRepository.items.push(newMobileDevice)

    const result = await sut.execute({
      mobileDeviceId: newMobileDevice.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(mobileDevicesRepository.items).toHaveLength(0)
    }
  })
})
