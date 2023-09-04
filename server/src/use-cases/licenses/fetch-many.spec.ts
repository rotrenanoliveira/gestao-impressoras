import { beforeEach, describe, expect, it } from 'vitest'
import { FetchManyLicensesUseCase } from './fetch-many'
import { InMemoryLicensesRepository } from '@/repositories/in-memory/in-memory-licenses-repository'

let licensesRepository: InMemoryLicensesRepository
let sut: FetchManyLicensesUseCase

describe('Fetch many licenses use case', () => {
  beforeEach(() => {
    licensesRepository = new InMemoryLicensesRepository()
    sut = new FetchManyLicensesUseCase(licensesRepository)
  })

  it('should be able to fetch many licenses', async () => {
    for (let i = 0; i < 5; i++) {
      await licensesRepository.create({
        description: `license-${i}`,
        expiresAt: new Date('2024, 01, 01'),
        initAt: new Date('2023, 01, 01'),
        obs: 'Microsoft Partner',
        price: {
          currency: 'BRL',
          value: 8000,
        },
      })
    }

    const { licenses } = await sut.execute()

    expect(licenses).toHaveLength(5)
  })
})
