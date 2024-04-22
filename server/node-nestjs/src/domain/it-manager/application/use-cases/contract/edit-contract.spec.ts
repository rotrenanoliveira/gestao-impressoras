import { makeContract } from 'test/factories/make-contract'
import { InMemoryContractsRepository } from 'test/repositories/in-memory-contracts-repository'

import { EditContractUseCase } from './edit-contract'

let contractsRepository: InMemoryContractsRepository
let sut: EditContractUseCase

describe('Edit contract', () => {
  beforeEach(() => {
    contractsRepository = new InMemoryContractsRepository()
    sut = new EditContractUseCase(contractsRepository)
  })

  it('should be able to edit contract', async () => {
    const newContract = makeContract()
    contractsRepository.items.push(newContract)

    const result = await sut.execute({
      contractId: newContract.id.toString(),
      description: 'Contract 01',
      contactEmail: 'contract-01@example.com',
      type: 'rental',
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.contract).toEqual(
        expect.objectContaining({
          description: 'Contract 01',
          contactEmail: 'contract-01@example.com',
          type: 'rental',
        }),
      )
    }
  })

  it('should not be able to edit contract if invalid id', async () => {
    const result = await sut.execute({
      contractId: 'invalid-id',
      description: 'Contract 01',
      contactEmail: 'contract-01@example.com',
      type: 'rental',
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
