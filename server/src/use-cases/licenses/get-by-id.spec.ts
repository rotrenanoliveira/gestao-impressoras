import { beforeEach, describe, expect, it } from 'vitest'
import { GetLicenseByIdUseCase } from './get-by-id'
import { ResourceNotFound } from '../errors/resource-not-found'
import { InMemoryLicensesRepository } from '@/repositories/in-memory/in-memory-licenses-repository'

let licensesRepository: InMemoryLicensesRepository
let sut: GetLicenseByIdUseCase

describe('Get license by id use case', () => {
  beforeEach(() => {
    licensesRepository = new InMemoryLicensesRepository()
    sut = new GetLicenseByIdUseCase(licensesRepository)
  })

  it('should be able to get license by id', async () => {
    const { id: licenseId } = await licensesRepository.create({
      description: 'Office 365',
      expiresAt: new Date('2024, 01, 01'),
      initAt: new Date('2023, 01, 01'),
      obs: 'Microsoft Partner',
      price: {
        currency: 'BRL',
        value: 8000,
      },
    })

    const { license } = await sut.execute(licenseId)

    expect(license).toEqual(
      expect.objectContaining({
        id: licenseId,
        description: 'Office 365',
        expiresAt: new Date('2024, 01, 01'),
        initAt: new Date('2023, 01, 01'),
        obs: 'Microsoft Partner',
        price: expect.objectContaining({
          currency: 'BRL',
          value: 80,
        }),
      }),
    )
  })

  it('should not be able to get license with wrong ID', async () => {
    await expect(() => sut.execute('non-existent-license')).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
