import { makeUserLicense } from 'test/factories/make-user-license'
import { InMemoryUserLicensesRepository } from 'test/repositories/in-memory-user-licenses-repository'

import { ActiveUserLicenseUseCase } from './active-user-license'

let userLicensesRepository: InMemoryUserLicensesRepository
let sut: ActiveUserLicenseUseCase

describe('Active User License', () => {
  beforeEach(() => {
    userLicensesRepository = new InMemoryUserLicensesRepository()
    sut = new ActiveUserLicenseUseCase(userLicensesRepository)
  })

  it('should be able to active user license', async () => {
    const newUserLicense = makeUserLicense({
      status: 'inactive',
    })
    userLicensesRepository.items.push(newUserLicense)

    const result = await sut.execute({
      userLicenseId: newUserLicense.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.userLicense).toEqual(
        expect.objectContaining({
          id: newUserLicense.id,
          status: 'active',
        }),
      )
    }
  })

  it('should not be able to active user license with invalid user license', async () => {
    const result = await sut.execute({
      userLicenseId: 'invalid-id',
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
