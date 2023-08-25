import { beforeEach, describe, expect, it } from 'vitest'
import { RemoveLicenseUseCase } from './remove'
import { InMemoryLicensesRepository } from '@/repositories/in-memory/in-memory-licenses-repository'

let licensesRepository: InMemoryLicensesRepository
let sut: RemoveLicenseUseCase

describe('Remove license use case', () => {
  beforeEach(() => {
    licensesRepository = new InMemoryLicensesRepository()
    sut = new RemoveLicenseUseCase(licensesRepository)
  })

  it('should be able to remove license', async () => {
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

    await sut.execute(licenseId)

    expect(licensesRepository.items).toHaveLength(0)
  })
})
