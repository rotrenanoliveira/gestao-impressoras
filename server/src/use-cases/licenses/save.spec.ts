import { beforeEach, describe, expect, it } from 'vitest'
import { SaveLicenseUseCase } from './save'
import { InMemoryLicensesRepository } from '@/repositories/in-memory/in-memory-licenses-repository'

let licensesRepository: InMemoryLicensesRepository
let sut: SaveLicenseUseCase

describe('Save license use case', () => {
  beforeEach(() => {
    licensesRepository = new InMemoryLicensesRepository()
    sut = new SaveLicenseUseCase(licensesRepository)
  })

  it('should be able to save license', async () => {
    const { id: licenseId } = await licensesRepository.create({
      description: 'Office 365',
      expiresAt: new Date('2024, 01, 01'),
      initAt: new Date('2023, 01, 01'),
      obs: 'Microsoft Partner',
      price: {
        currency: 'BRL',
        value: 80 * 100,
      },
    })

    const { license } = await sut.execute(licenseId, {
      description: 'Microsoft 365',
      price: {
        currency: 'USD',
        value: 12.5,
      },
    })

    expect(license).toEqual(
      expect.objectContaining({
        id: licenseId,
        description: 'Microsoft 365',
        obs: 'Microsoft Partner',
        price: expect.objectContaining({
          currency: 'USD',
          value: 12.5,
        }),
      }),
    )
  })
})
