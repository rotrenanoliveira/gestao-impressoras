import { faker } from '@faker-js/faker'
import { InMemoryContractsRepository } from 'test/repositories/in-memory-contracts-repository'

import { CreateContractUseCase } from './create-contract'

let contractsRepository: InMemoryContractsRepository
let sut: CreateContractUseCase

describe('Register contract', () => {
  beforeEach(() => {
    contractsRepository = new InMemoryContractsRepository()
    sut = new CreateContractUseCase(contractsRepository)
  })

  it('should be able to register contract', async () => {
    const result = await sut.execute({
      description: faker.commerce.productDescription(),
      type: 'rental',
      contactEmail: faker.internet.email(),
      startAt: faker.date.recent(),
      endAt: faker.date.future(),
    })

    expect(result.hasSucceeded()).toBeTruthy()
  })
})
