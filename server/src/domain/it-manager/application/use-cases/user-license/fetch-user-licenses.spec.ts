import { InMemoryUserLicensesRepository } from 'test/repositories/in-memory-user-licenses-repository'
import { FetchUserLicensesUseCase } from './fetch-user-licenses'
import { makeUserLicense } from 'test/factories/make-user-license'

let userLicensesRepository: InMemoryUserLicensesRepository
let sut: FetchUserLicensesUseCase

describe('Fetch user licenses', () => {
  beforeEach(() => {
    userLicensesRepository = new InMemoryUserLicensesRepository()
    sut = new FetchUserLicensesUseCase(userLicensesRepository)
  })

  it('should be able to fetch user licenses', async () => {
    for (let i = 0; i < 5; i++) {
      userLicensesRepository.items.push(makeUserLicense())
    }

    const result = await sut.execute()

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.userLicenses).toHaveLength(5)
    }
  })
})
