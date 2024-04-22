import { makeContract } from 'test/factories/make-contract'
import { makeDevice } from 'test/factories/make-device'
import { InMemoryContractsRepository } from 'test/repositories/in-memory-contracts-repository'
import { InMemoryDevicesRepository } from 'test/repositories/in-memory-devices-repository'

import { EditDeviceUseCase } from './edit-device'

let devicesRepository: InMemoryDevicesRepository
let contractsRepository: InMemoryContractsRepository
let sut: EditDeviceUseCase

describe('Edit device', () => {
  beforeEach(() => {
    devicesRepository = new InMemoryDevicesRepository()
    contractsRepository = new InMemoryContractsRepository()
    sut = new EditDeviceUseCase(devicesRepository, contractsRepository)
  })

  it('should be able to edit device', async () => {
    const newContract = makeContract()
    contractsRepository.items.push(newContract)

    const newDevice = makeDevice({
      contractId: newContract.id,
      model: 'Device model 01',
    })
    devicesRepository.items.push(newDevice)

    const result = await sut.execute({
      deviceId: newDevice.id.toString(),
      model: 'Device model 02',
      warrantyEndDate: null,
      contractId: null,
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.device).toEqual(
        expect.objectContaining({
          model: 'Device model 02',
          warrantyEndDate: null,
          contractId: null,
        }),
      )
    }
  })

  it('should not be able to edit device with wrong device id', async () => {
    const result = await sut.execute({
      deviceId: 'non-existent-device',
      model: 'Device model 02',
      warrantyEndDate: null,
      contractId: null,
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
