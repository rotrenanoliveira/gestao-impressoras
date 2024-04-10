import { InMemoryLicensesRepository } from 'test/repositories/in-memory-licenses-repository'
import { makeLicense } from 'test/factories/make-license'
import { EditLicenseCostUseCase } from './edit-license-cost'

let licensesRepository: InMemoryLicensesRepository
let sut: EditLicenseCostUseCase

describe('Edit license cost', () => {
  beforeEach(() => {
    licensesRepository = new InMemoryLicensesRepository()
    sut = new EditLicenseCostUseCase(licensesRepository)
  })

  it('should be able to edit license cost', async () => {
    const newLicense = makeLicense()
    licensesRepository.items.push(newLicense)

    const { license } = await sut.execute({
      licenseId: newLicense.id.toString(),
      cost: {
        value: 80,
        currency: 'BRL',
      },
    })

    expect(license).toEqual(
      expect.objectContaining({
        cost: {
          value: 80,
          currency: 'BRL',
        },
      }),
    )
  })

  it('should not be able to edit license with negative cost', async () => {
    const license = makeLicense()
    licensesRepository.items.push(license)

    await expect(
      sut.execute({
        licenseId: license.id.toString(),
        cost: {
          value: -10,
          currency: 'BRL',
        },
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
