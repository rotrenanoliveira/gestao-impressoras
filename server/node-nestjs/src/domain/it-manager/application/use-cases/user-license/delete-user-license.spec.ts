import { makeUserLicense } from 'test/factories/make-user-license'
import { InMemoryUserLicensesRepository } from 'test/repositories/in-memory-user-licenses-repository'

import { DeleteUserLicenseUseCase } from './delete-user-license'

let userLicensesRepository: InMemoryUserLicensesRepository
let sut: DeleteUserLicenseUseCase

describe('Delete user license', () => {
  beforeEach(() => {
    userLicensesRepository = new InMemoryUserLicensesRepository()
    sut = new DeleteUserLicenseUseCase(userLicensesRepository)
  })

  it('should be able to delete user license', async () => {
    const newUserLicense = makeUserLicense()
    userLicensesRepository.items.push(newUserLicense)

    const result = await sut.execute({
      userLicenseId: newUserLicense.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(userLicensesRepository.items).toHaveLength(0)
    }
  })
})
