import { makeUserLicense } from 'test/factories/make-user-license'
import { InMemoryUserLicensesRepository } from 'test/repositories/in-memory-user-licenses-repository'

import { InactiveUserLicenseUseCase } from './inactive-user-license'

let userLicensesRepository: InMemoryUserLicensesRepository
let sut: InactiveUserLicenseUseCase

describe('Inactive User License', () => {
  beforeEach(() => {
    userLicensesRepository = new InMemoryUserLicensesRepository()
    sut = new InactiveUserLicenseUseCase(userLicensesRepository)
  })

  it('should be able to inactive user license', async () => {
    const newUserLicense = makeUserLicense()
    userLicensesRepository.items.push(newUserLicense)

    const result = await sut.execute({
      userLicenseId: newUserLicense.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.userLicense).toEqual(
        expect.objectContaining({
          id: newUserLicense.id,
          status: 'inactive',
        }),
      )
    }
  })

  it('should not be able to inactive user license with invalid user license', async () => {
    const result = await sut.execute({
      userLicenseId: 'invalid-id',
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
