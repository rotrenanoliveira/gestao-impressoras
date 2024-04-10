import { InMemoryLicensesRepository } from 'test/repositories/in-memory-licenses-repository'
import { makeLicense } from 'test/factories/make-license'
import { EditLicenseQuantityUseCase } from './edit-license-quantity'

let licensesRepository: InMemoryLicensesRepository
let sut: EditLicenseQuantityUseCase

describe('Edit license quantity', () => {
  beforeEach(() => {
    licensesRepository = new InMemoryLicensesRepository()
    sut = new EditLicenseQuantityUseCase(licensesRepository)
  })

  it('should be able to edit license quantity', async () => {
    const newLicense = makeLicense({
      quantity: 20,
    })

    licensesRepository.items.push(newLicense)

    const { license } = await sut.execute({
      licenseId: newLicense.id.toString(),
      quantity: 50,
    })

    expect(license).toEqual(
      expect.objectContaining({
        quantity: 50,
      }),
    )
  })
})
