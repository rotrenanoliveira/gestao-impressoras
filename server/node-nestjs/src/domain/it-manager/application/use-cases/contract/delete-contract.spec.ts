import { makeContract } from 'test/factories/make-contract'
import { InMemoryContractsRepository } from 'test/repositories/in-memory-contracts-repository'

import { DeleteContractUseCase } from './delete-contract'

let contractsRepository: InMemoryContractsRepository
let sut: DeleteContractUseCase

describe('Delete contract', () => {
  beforeEach(() => {
    contractsRepository = new InMemoryContractsRepository()
    sut = new DeleteContractUseCase(contractsRepository)
  })

  it('should be able to delete contract', async () => {
    const newContract = makeContract()
    contractsRepository.items.push(newContract)

    const result = await sut.execute({
      contractId: newContract.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()
    expect(contractsRepository.items).toHaveLength(0)
  })
})
