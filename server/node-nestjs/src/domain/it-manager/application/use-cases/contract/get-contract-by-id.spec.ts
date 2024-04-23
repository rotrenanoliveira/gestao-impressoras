import { makeContract } from 'test/factories/make-contract'
import { InMemoryContractsRepository } from 'test/repositories/in-memory-contracts-repository'

import { GetContractByIdUseCase } from './get-contract-by-id'

let contractsRepository: InMemoryContractsRepository
let sut: GetContractByIdUseCase

describe('Get contract by id', () => {
  beforeEach(() => {
    contractsRepository = new InMemoryContractsRepository()
    sut = new GetContractByIdUseCase(contractsRepository)
  })

  it('should be able to get contract by id', async () => {
    const newContract = makeContract({
      description: 'Contract 01',
    })
    contractsRepository.items.push(newContract)

    const result = await sut.execute({
      contractId: newContract.id.toString(),
    })

    expect(result.hasSucceeded()).toBe(true)

    if (result.hasSucceeded()) {
      expect(result.result.contract).toEqual(
        expect.objectContaining({
          id: newContract.id,
          description: 'Contract 01',
        }),
      )
    }
  })

  it('should not be able to get contract with wrong id', async () => {
    const result = await sut.execute({
      contractId: 'non-existent-id',
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
