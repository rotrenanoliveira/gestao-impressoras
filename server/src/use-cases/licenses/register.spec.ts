import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterLicenseUseCase } from './register'
import { InMemoryLicensesRepository } from '@/repositories/in-memory/in-memory-licenses-repository'

let licensesRepository: InMemoryLicensesRepository
let sut: RegisterLicenseUseCase

describe('Register license use case', () => {
  beforeEach(() => {
    licensesRepository = new InMemoryLicensesRepository()
    sut = new RegisterLicenseUseCase(licensesRepository)
  })

  it('should be able to register license device', async () => {
    const { license } = await sut.execute({
      description: 'Microsoft 365',
      expiresAt: new Date('2024, 01, 01'),
      initAt: new Date('2023, 01, 01'),
      obs: null,
      price: {
        currency: 'BRL',
        value: 80,
      },
    })

    expect(license).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        description: 'Microsoft 365',
        initAt: new Date('2023, 01, 01'),
        expiresAt: new Date('2024, 01, 01'),
        price: expect.objectContaining({
          currency: 'BRL',
          value: 80,
        }),
        obs: null,
      }),
    )
  })
})
