import { faker } from '@faker-js/faker'

import { InMemoryLicensesRepository } from 'test/repositories/in-memory-licenses-repository'
import { makeLicense } from 'test/factories/make-license'
import { EditLicenseExpireDateUseCase } from './edit-license-expire-date'

let licensesRepository: InMemoryLicensesRepository
let sut: EditLicenseExpireDateUseCase

describe('Edit license expire date', () => {
  beforeEach(() => {
    licensesRepository = new InMemoryLicensesRepository()
    sut = new EditLicenseExpireDateUseCase(licensesRepository)
  })

  it('should be able to edit license expire date', async () => {
    const futureDate = faker.date.future()

    const newLicense = makeLicense()
    licensesRepository.items.push(newLicense)

    const result = await sut.execute({
      licenseId: newLicense.id.toString(),
      expiresAt: futureDate,
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.license).toEqual(
        expect.objectContaining({
          expiresAt: futureDate,
        }),
      )
    }
  })

  it('should not be able to edit license with expire date in the pass', async () => {
    const license = makeLicense()
    licensesRepository.items.push(license)

    const result = await sut.execute({
      licenseId: license.id.toString(),
      expiresAt: faker.date.past(),
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
