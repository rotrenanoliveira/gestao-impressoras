import { InMemoryLicensesRepository } from 'test/repositories/in-memory-licenses-repository'
import { RegisterLicenseUseCase } from './register-license'
import { InvalidParameterError } from '@/core/errors/invalid-parameter-error'

let licensesRepository: InMemoryLicensesRepository
let sut: RegisterLicenseUseCase

describe('Register license', () => {
  beforeEach(() => {
    licensesRepository = new InMemoryLicensesRepository()
    sut = new RegisterLicenseUseCase(licensesRepository)
  })

  it('should be able to register a license', async () => {
    const result = await sut.execute({
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

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.license).toEqual(
        expect.objectContaining({
          name: 'Microsoft Office',
          quantity: 50,
          partner: 'Microsoft',
          expiresAt: new Date('2024-12-31'),
        }),
      )

      expect(licensesRepository.items[0]).toEqual(
        expect.objectContaining({
          ...result.result.license,
        }),
      )
    }
  })

  it('should not be able to register a expired license', async () => {
    const result = await sut.execute({
      name: 'Microsoft Office',
      quantity: 50,
      partner: 'Microsoft',
      expiresAt: new Date('2024-01-01'),
      cost: {
        value: 12,
        currency: 'USD',
      },
      obs: '',
    })

    expect(result.hasFailed()).toBeTruthy()

    if (result.hasFailed()) {
      expect(result.reason).toBeInstanceOf(InvalidParameterError)
    }
  })
})
