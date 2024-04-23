import { makeLicense } from 'test/factories/make-license'
import { InMemoryLicensesRepository } from 'test/repositories/in-memory-licenses-repository'

import { FetchLicensesUseCase } from './fetch-licenses'

let licensesRepository: InMemoryLicensesRepository
let sut: FetchLicensesUseCase

describe('Fetch licenses', () => {
  beforeEach(() => {
    licensesRepository = new InMemoryLicensesRepository()
    sut = new FetchLicensesUseCase(licensesRepository)
  })

  it('should be able to fetch licenses', async () => {
    for (let i = 0; i < 5; i++) {
      licensesRepository.items.push(makeLicense())
    }

    const result = await sut.execute()

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.licenses).toHaveLength(5)
    }
  })
})
