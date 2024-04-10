import { faker } from '@faker-js/faker'

import { InMemoryLicensesRepository } from 'test/repositories/in-memory-licenses-repository'
import { makeLicense } from 'test/factories/make-license'
import { EditLicenseUseCase } from './edit-license'

let licensesRepository: InMemoryLicensesRepository
let sut: EditLicenseUseCase

describe('Edit license', () => {
  beforeEach(() => {
    licensesRepository = new InMemoryLicensesRepository()
    sut = new EditLicenseUseCase(licensesRepository)
  })

  it('should be able to edit license', async () => {
    const newLicense = makeLicense()
    licensesRepository.items.push(newLicense)

    const { license } = await sut.execute({
      licenseId: newLicense.id.toString(),
      name: 'office',
      quantity: 20,
      partner: 'microsoft',
      expiresAt: faker.date.future(),
      cost: {
        value: 15,
        currency: 'USD',
      },
      obs: '',
    })

    expect(license).toEqual(
      expect.objectContaining({
        name: 'office',
        quantity: 20,
        partner: 'microsoft',
      }),
    )
  })
})
