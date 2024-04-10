import { InMemoryLicensesRepository } from 'test/repositories/in-memory-licenses-repository'
import { RegisterLicenseUseCase } from './register-license'

let licensesRepository: InMemoryLicensesRepository
let sut: RegisterLicenseUseCase

describe('Register license', () => {
  beforeEach(() => {
    licensesRepository = new InMemoryLicensesRepository()
    sut = new RegisterLicenseUseCase(licensesRepository)
  })

  it('should be able to register a license', async () => {
    const { license } = await sut.execute({
      name: 'Microsoft Office',
      quantity: 50,
      partner: 'Microsoft',
      expiresAt: new Date('2024-12-31'),
      cost: {
        value: 12,
        currency: 'USD',
      },
      obs: '',
    })

    expect(license).toEqual(
      expect.objectContaining({
        name: 'Microsoft Office',
        quantity: 50,
        partner: 'Microsoft',
        expiresAt: new Date('2024-12-31'),
      }),
    )

    expect(licensesRepository.items[0]).toEqual(
      expect.objectContaining({
        ...license,
      }),
    )
  })

  it('should not be able to register a expired license', async () => {
    await expect(
      sut.execute({
        name: 'Microsoft Office',
        quantity: 50,
        partner: 'Microsoft',
        expiresAt: new Date('2024-01-01'),
        cost: {
          value: 12,
          currency: 'USD',
        },
        obs: '',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
