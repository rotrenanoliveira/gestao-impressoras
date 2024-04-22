import { faker } from '@faker-js/faker'
import { makeContract } from 'test/factories/make-contract'
import { InMemoryContractsRepository } from 'test/repositories/in-memory-contracts-repository'

import { EditContractEndDateUseCase } from './edit-contract-end-date'

let contractsRepository: InMemoryContractsRepository
let sut: EditContractEndDateUseCase

describe('Edit contract end date', () => {
  beforeEach(() => {
    contractsRepository = new InMemoryContractsRepository()
    sut = new EditContractEndDateUseCase(contractsRepository)
  })

  it('should be able to edit contract end date', async () => {
    const newContract = makeContract()
    contractsRepository.items.push(newContract)

    const result = await sut.execute({
      contractId: newContract.id.toString(),
      endAt: faker.date.future(),
    })

    expect(result.hasSucceeded()).toBeTruthy()
  })
})
