import { makeComputer } from 'test/factories/make-computer'
import { InMemoryComputersRepository } from 'test/repositories/in-memory-computers-repository'

import { FetchComputersUseCase } from './fetch-computers'

let computersRepository: InMemoryComputersRepository
let sut: FetchComputersUseCase

describe('Fetch computers', () => {
  beforeEach(() => {
    computersRepository = new InMemoryComputersRepository()
    sut = new FetchComputersUseCase(computersRepository)
  })

  it('should be able to fetch computers', async () => {
    for (let i = 0; i < 5; i++) {
      computersRepository.items.push(makeComputer())
    }

    const result = await sut.execute()

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.computers).toHaveLength(5)
      expect(computersRepository.items).toHaveLength(5)
    }
  })
})
