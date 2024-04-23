import { faker } from '@faker-js/faker'
import { makeComputer } from 'test/factories/make-computer'
import { makeContract } from 'test/factories/make-contract'
import { InMemoryComputersRepository } from 'test/repositories/in-memory-computers-repository'
import { InMemoryContractsRepository } from 'test/repositories/in-memory-contracts-repository'

import { EditComputerUseCase } from './edit-computer'

let computersRepository: InMemoryComputersRepository
let contractsRepository: InMemoryContractsRepository
let sut: EditComputerUseCase

describe('Edit computer', () => {
  beforeEach(() => {
    computersRepository = new InMemoryComputersRepository()
    contractsRepository = new InMemoryContractsRepository()
    sut = new EditComputerUseCase(computersRepository, contractsRepository)
  })

  it('should be able to edit computer', async () => {
    const computer = makeComputer()
    computersRepository.items.push(computer)

    const result = await sut.execute({
      computerId: computer.id.toString(),
      hostname: 'new-hostname',
      ipAddress: 'dynamic',
      model: 'Device model 01',
      operatingSystem: 'Windows Millennium Edition',
      warrantyEndDate: faker.date.future(),
      description: faker.lorem.sentence(),
      contractId: null,
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.computer).toEqual(
        expect.objectContaining({
          hostname: 'new-hostname',
          ipAddress: 'dynamic',
          model: 'Device model 01',
          operatingSystem: 'Windows Millennium Edition',
          warrantyEndDate: expect.any(Date),
          description: expect.any(String),
          contractId: null,
        }),
      )
    }
  })

  it('should not be able to edit computer with invalid computer id', async () => {
    const result = await sut.execute({
      computerId: 'non-existing-computer',
      hostname: 'new-hostname',
      ipAddress: 'dynamic',
      model: 'Device model 01',
      operatingSystem: 'Windows Millennium Edition',
      description: faker.lorem.sentence(),
      warrantyEndDate: null,
      contractId: null,
    })

    expect(result.hasFailed()).toBeTruthy()
  })

  it('should be able to edit computer with contract', async () => {
    const contract = makeContract()
    contractsRepository.items.push(contract)

    const computer = makeComputer()
    computersRepository.items.push(computer)

    const result = await sut.execute({
      computerId: computer.id.toString(),
      hostname: 'new-hostname',
      ipAddress: 'dynamic',
      model: 'Device model 01',
      operatingSystem: 'Windows Millennium Edition',
      description: faker.lorem.sentence(),
      contractId: contract.id.toString(),
      warrantyEndDate: null,
    })

    expect(result.hasSucceeded()).toBeTruthy()
  })

  it('should not be able to edit computer with invalid contract', async () => {
    const computer = makeComputer()
    computersRepository.items.push(computer)

    const result = await sut.execute({
      computerId: computer.id.toString(),
      contractId: 'non-existent-contract',
      hostname: 'new-hostname',
      ipAddress: 'dynamic',
      model: 'Device model 01',
      operatingSystem: 'Windows Millennium Edition',
      description: faker.lorem.sentence(),
      warrantyEndDate: null,
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
