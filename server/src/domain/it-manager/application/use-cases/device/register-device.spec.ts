import { faker } from '@faker-js/faker'

import { InMemoryContractsRepository } from 'test/repositories/in-memory-contracts-repository'
import { InMemoryDevicesRepository } from 'test/repositories/in-memory-devices-repository'
import { RegisterDeviceUseCase } from './register-device'
import { makeContract } from 'test/factories/make-contract'

let devicesRepository: InMemoryDevicesRepository
let contractsRepository: InMemoryContractsRepository
let sut: RegisterDeviceUseCase

describe('Register device', () => {
  beforeEach(() => {
    devicesRepository = new InMemoryDevicesRepository()
    contractsRepository = new InMemoryContractsRepository()
    sut = new RegisterDeviceUseCase(devicesRepository, contractsRepository)
  })

  it('should be able to register device', async () => {
    const result = await sut.execute({
      serialNumber: 'SMPH00123',
      model: 'Model 01',
      invoice: 'Invoice 01',
      assetTag: null,
      purchaseDate: faker.date.recent(),
      warrantyEndDate: faker.date.future(),
      contractId: null,
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.device).toEqual(
        expect.objectContaining({
          serialNumber: 'SMPH00123',
          model: 'Model 01',
          invoice: 'Invoice 01',
          purchaseDate: expect.any(Date),
          warrantyEndDate: expect.any(Date),
          contractId: null,
          assetTag: null,
        }),
      )
    }
  })

  it('should be able to register device with contract', async () => {
    const contract = makeContract()
    contractsRepository.items.push(contract)

    const result = await sut.execute({
      serialNumber: 'SMPH00123',
      model: 'Model 01',
      invoice: 'Invoice 01',
      purchaseDate: faker.date.recent(),
      warrantyEndDate: faker.date.future(),
      contractId: contract.id.toString(),
      assetTag: null,
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.device).toEqual(
        expect.objectContaining({
          serialNumber: 'SMPH00123',
          model: 'Model 01',
          invoice: 'Invoice 01',
          assetTag: null,
          purchaseDate: expect.any(Date),
          warrantyEndDate: expect.any(Date),
          contractId: contract.id,
        }),
      )
    }
  })

  it('should not be able to register device with invalid contract', async () => {
    const result = await sut.execute({
      serialNumber: 'SMPH00123',
      model: 'Model 01',
      invoice: 'Invoice 01',
      purchaseDate: faker.date.recent(),
      warrantyEndDate: faker.date.future(),
      contractId: 'non-existing-contract-id',
      assetTag: null,
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
