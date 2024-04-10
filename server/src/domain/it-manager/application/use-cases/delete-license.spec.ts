import { InMemoryLicensesRepository } from 'test/repositories/in-memory-licenses-repository'
import { makeLicense } from 'test/factories/make-license'
import { DeleteLicenseUseCase } from './delete-license'

let licensesRepository: InMemoryLicensesRepository
let sut: DeleteLicenseUseCase

describe('Delete license', () => {
  beforeEach(() => {
    licensesRepository = new InMemoryLicensesRepository()
    sut = new DeleteLicenseUseCase(licensesRepository)
  })

  it('should be able to delete a license', async () => {
    const newLicense = makeLicense()
    licensesRepository.items.push(newLicense)

    await sut.execute({
      licenseId: newLicense.id.toString(),
    })

    expect(licensesRepository.items).toHaveLength(0)
  })
})
