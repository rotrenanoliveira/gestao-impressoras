import { faker } from '@faker-js/faker'

import { InMemoryContractsRepository } from 'test/repositories/in-memory-contracts-repository'
import { RegisterContractUseCase } from './register-contract'

let contractsRepository: InMemoryContractsRepository
let sut: RegisterContractUseCase

describe('Register contract', () => {
  beforeEach(() => {
    contractsRepository = new InMemoryContractsRepository()
    sut = new RegisterContractUseCase(contractsRepository)
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
