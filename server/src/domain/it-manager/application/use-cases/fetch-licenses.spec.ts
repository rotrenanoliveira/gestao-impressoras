import { InMemoryLicensesRepository } from 'test/repositories/in-memory-licenses-repository'
import { makeLicense } from 'test/factories/make-license'
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

    const { licenses } = await sut.execute()

    expect(licenses).toHaveLength(5)
  })
})
