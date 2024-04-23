import { faker } from '@faker-js/faker'
import { makeContract } from 'test/factories/make-contract'
import { InMemoryComputersRepository } from 'test/repositories/in-memory-computers-repository'
import { InMemoryContractsRepository } from 'test/repositories/in-memory-contracts-repository'

import { CreateComputerUseCase } from './create-computer'

let computersRepository: InMemoryComputersRepository
let contractsRepository: InMemoryContractsRepository
let sut: CreateComputerUseCase

describe('Register computer', () => {
  beforeEach(() => {
    computersRepository = new InMemoryComputersRepository()
    contractsRepository = new InMemoryContractsRepository()
    sut = new CreateComputerUseCase(computersRepository, contractsRepository)
  })

  it('should be able to register computer', async () => {
    const result = await sut.execute({
      hostname: faker.internet.domainName(),
      ipAddress: 'dynamic',
      operatingSystem: 'Windows XP',
      type: 'DESKTOP',
      model: 'Microsoft',
      serialNumber: 'DEV00123',
      invoice: 'NF00123',
      description: faker.lorem.sentence(),
      purchaseDate: faker.date.recent(),
      warrantyEndDate: faker.date.future(),
      contractId: null,
      assetTag: null,
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.computer).toEqual(
        expect.objectContaining({
          hostname: expect.any(String),
          ipAddress: 'dynamic',
          operatingSystem: 'Windows XP',
          type: 'DESKTOP',
          model: 'Microsoft',
          serialNumber: 'DEV00123',
          invoice: 'NF00123',
          description: expect.any(String),
          purchaseDate: expect.any(Date),
          warrantyEndDate: expect.any(Date),
          contractId: null,
          assetTag: null,
        }),
      )
    }
  })

  it('should be able to register computer with contract', async () => {
    const contract = makeContract()
    contractsRepository.items.push(contract)

    const result = await sut.execute({
      hostname: faker.internet.domainName(),
      ipAddress: 'dynamic',
      operatingSystem: 'Windows XP',
      type: 'DESKTOP',
      model: 'Microsoft',
      serialNumber: 'DEV00123',
      invoice: 'NF00123',
      description: faker.lorem.sentence(),
      purchaseDate: faker.date.recent(),
      warrantyEndDate: faker.date.future(),
      contractId: contract.id.toString(),
      assetTag: null,
    })

    expect(result.hasSucceeded()).toBeTruthy()
  })

  it('should not be able to register computer with invalid contract id', async () => {
    const result = await sut.execute({
      hostname: faker.internet.domainName(),
      ipAddress: 'dynamic',
      operatingSystem: 'Windows XP',
      type: 'DESKTOP',
      model: 'Microsoft',
      serialNumber: 'DEV00123',
      invoice: 'NF00123',
      description: faker.lorem.sentence(),
      purchaseDate: faker.date.recent(),
      warrantyEndDate: faker.date.future(),
      contractId: 'invalid-id',
      assetTag: null,
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
