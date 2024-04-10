import { InMemoryLicensesRepository } from 'test/repositories/in-memory-licenses-repository'
import { GetLicenseByIdUseCase } from './get-license-by-id'
import { makeLicense } from 'test/factories/make-license'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let licensesRepository: InMemoryLicensesRepository
let sut: GetLicenseByIdUseCase

describe('Get license by id', () => {
  beforeEach(() => {
    licensesRepository = new InMemoryLicensesRepository()
    sut = new GetLicenseByIdUseCase(licensesRepository)
  })

  it('should be able to get license by id', async () => {
    licensesRepository.items.push(
      makeLicense(
        {
          name: 'chat-gpt',
        },
        new UniqueEntityID('license-id'),
      ),
    )

    const { license } = await sut.execute({
      licenseId: 'license-id',
    })

    expect(license).toEqual(
      expect.objectContaining({
        name: 'chat-gpt',
      }),
    )
  })

  it('should not be able to get a license with wrong id', async () => {
    await expect(
      sut.execute({
        licenseId: 'non-existent-license',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
